package com.viosystems;

import java.util.ArrayList;
import java.util.List;

public class Greeting {

    private final long id;
    private final String content;
    private List<PropEntry> properties = new ArrayList<PropEntry>();

    public Greeting(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return properties.size();
    }

    public String getContent() {
        return content;
    }

    public void addList(PropEntry p){
        properties.add(p);
    }

    public List<PropEntry> getProperties(){
        return this.properties;
    }
}