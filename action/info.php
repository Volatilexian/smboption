<?php

function getNetbiosName(){
    return shell_exec("uci show samba.@global[0].netbios | awk '{FS=\"=\"} {print $2}'");
}

function getDisk(){
    $i = 0;
    $info = array();
    while(shell_exec("uci show devices.@automount[$i].name | wc -l") == 1)
    {
        $name = shell_exec("uci show devices.@automount[$i].name | awk '{FS=\"=\"}{print $2}'");
        $label = shell_exec("uci show devices.@automount[$i].label | awk '{FS=\"=\"}{print $2}'");
        $path = shell_exec("uci show devices.@automount[$i].path | awk '{FS=\"=\"}{print $2}'");
        $dirs = scandir(trim($path));
        
        //remove the file
        foreach($dirs as $key=> $value)
        {
            if(!is_dir(trim($path).'/'.$value))
            {
                array_splice($dirs, $key, 1);
                //reset($dirs);
            }
        }
        
        $info[trim($name)][] = array(trim($label), trim($path), $dirs);
        $i++;
    }
    
    return $info;
}

function getSambaUser() {
    $users = she
}