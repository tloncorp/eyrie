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
++  on-load   
  |=  =vase
  ^-  (quip card:agent:gall _this)
  =+  .^(timers=(list [@da duct]) %bx /(scot %p our.bowl)//(scot %da now.bowl)/debug/timers)
  :_  this
  %-  zing
  %+  turn
    timers
  |=  [t=@da d=duct]
  %+  murn
    d
  |=  w=wire
  ?~  (find ~['every'] w)   ~
  `[%pass /every/[(rear w)] %arvo %b %rest t]
++  on-poke   on-poke:default
++  on-watch
  |=  =path
  ^-  (quip card:agent:gall _this)
  :_  this
    ?+  path  ~|("unexpected subscription" !!)
         ::
       [%every @ ~]
    =/  dr  (slav %dr i.t.path)
    =+  .^(timers=(list [@da duct]) %bx /(scot %p our.bowl)//(scot %da now.bowl)/debug/timers)
    =/  has-timer
      %+  lien
        timers
      |=  [t=@da d=duct]
      ^-  ?
      %+  lien
        d
      |=  w=wire
      ?~  (find ~['every'] w)  |
      =(dr (slav %dr (rear w)))
    ?:  has-timer  ~
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
  ?.  ?=([%every @ ~] wire)  !!
  =/  dr  (slav %dr i.t.wire)
  :_  this
  :~  [%give %fact [wire ~] %json !>([%s 'hello'])]
      [%pass wire %arvo %b %wait (add now.bowl dr)]
  ==
++  on-fail   on-fail:default
--
