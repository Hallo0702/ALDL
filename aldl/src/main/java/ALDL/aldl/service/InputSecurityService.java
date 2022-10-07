package ALDL.aldl.service;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Service
@RequiredArgsConstructor
public class InputSecurityService {
    public boolean inputEmailCheck(String email){
        if ((email.split("@")[1]).split("\\.").length>=2){
            return true;
        }
        else{
            return false;
        }


    }
    String[] SQLs = {"where ", "select ", " admin","drop ","delete ","\'or\'1\'=\'1"," " };
    public boolean sqlInjectionCheck(String input){
        for (int i=0;i< SQLs.length;i++){
            if (input.contains(SQLs[i])){
                return false;

            }
        }
        return true;
    }
}
