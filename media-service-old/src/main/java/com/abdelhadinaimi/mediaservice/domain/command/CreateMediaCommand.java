package com.abdelhadinaimi.mediaservice.domain.command;

public class CreateMediaCommand extends BaseCommand<String> {

    public final String title;
    public final String description;

    public CreateMediaCommand(String id, String title, String description) {
        super(id);
        this.title = title;
        this.description = description;
    }
}
