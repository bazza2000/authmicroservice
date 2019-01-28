package com.viosystems;

public class PropEntry {
    private final String name;
    private final String value;

    PropEntry(String n, String v){
        this.name =n;
        this.value= v;
    }

    public String getName(){
        return this.name;
    }

    public String getValue(){
        return this.value;
    }
}
