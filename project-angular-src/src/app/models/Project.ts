export interface Project {
    dateCreated: Date;
    dateModified: Date;
    owner: string;
    projectName: string;
    projectDescription: string;
    projectMembers: string;
    techStack: string[];
    repositoryLink: string;
    projectDemo: string;
    labels: string[];
    _id: string;
}

export interface NewProject {
    owner: string;
    projectName: string;
    projectDescription: string;
    projectMembers: string;
    techStack: string[];
    repositoryLink: string;
    projectDemo: string;
    labels: string[];
}
