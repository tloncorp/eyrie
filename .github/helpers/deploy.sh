#!/usr/bin/env bash

# this script deploys a desk to a ship from a github repository
# assumes gcloud credentials are loaded and gcloud installed.

repo=$1
desk=$2
ship=$3
zone=$4
ref=${5:-.}
folder=$ship/$desk

set -e
set -o pipefail
cmdfile=$(mktemp "${TMPDIR:-/tmp/}janeway.XXXXXXXXX")
# mktemp only used for generating a random folder name below
cmds='
source_repo=$(mktemp --dry-run /tmp/repo.janeway.XXXXXXXXX)
git clone --depth 1 git@github.com:'$repo'.git $source_repo
cd $source_repo
git checkout '$ref'
cd /home/urb || return
curl -s --data '\''{"source":{"dojo":"+hood/mount %'$desk'"},"sink":{"app":"hood"}}'\'' http://localhost:12321
rsync -avL --delete $source_repo/desk/ '$folder'
curl -s --data '\''{"source":{"dojo":"+hood/commit %'$desk'"},"sink":{"app":"hood"}}'\'' http://localhost:12321
rm -rf $source_repo
'
echo "$cmds" >> "$cmdfile"
sshpriv=$(mktemp "${TMPDIR:-/tmp/}ssh.XXXXXXXXX")
sshpub=$sshpriv.pub
echo "$SSH_PUB_KEY" >> "$sshpub"
echo "$SSH_SEC_KEY" >> "$sshpriv"
chmod 600 $sshpub
chmod 600 $sshpriv

gcloud compute \
  --project mainnet \
  ssh \
  --tunnel-through-iap \
  --ssh-key-file "$sshpriv" \
  --ssh-flag="-T" \
  --zone "$zone" --verbosity info \
  urb@"$ship" < "$cmdfile"

echo "OTA performed for $desk on $ship"