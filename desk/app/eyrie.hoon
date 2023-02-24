::  courtesy of ~dinleb-rambep
/+  default-agent
^-  agent:gall
=|  state=@
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
::
++  on-init   on-init:default
++  on-save   on-save:default
++  on-load   on-load:default
++  on-poke   on-poke:default
++  on-watch
  |=  =path
  ^-  (quip card:agent:gall _this)
  :_  this
    ?+  path  ~|("unexpected subscription" !!)
         ::
       [%every @ ~]
    =/  dr  (slav %dr i.t.path)
    :~  [%give %fact [path ~] %json !>([%s 'hello'])]
        [%pass path %arvo %b %wait (add now.bowl dr)]
    ==
  ==
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?.  ?=(%wake +<.sign-arvo)  !!
  ?.  ?=([%every @ ~] wire)  !!
  =/  dr  (slav %dr i.t.wire)
  :_  this
  :~  [%give %fact [wire ~] %json !>([%s 'hello'])]
      [%pass wire %arvo %b %wait (add now.bowl dr)]
  ==
++  on-fail   on-fail:default
--
