export interface Project {
    dateCreated: Date;
    dateModified: Date;
    owner: String;
    projectName: String;
    projectDescription: String;
    projectMembers: String[];
    techStack: String[];
    repositoryLink: String;
    projectDemo: String;
    labels: String[];
    _id: String;
}

// export interface NewProject {

//     owner: string;
//     projectName: string;
//     projectDescription: string;
//     projectMembers: string;
//     techStack: string[];
//     repositoryLink: string;
//     projectDemo: string;
//     labels: string[];
// }

export interface NewProject {
    projectName: String;
    projectDescription: String;
    owner: String;
    projectMembers: String;
    techStack: String;
    repositoryLink: String;
    projectDemo: String;
    labels: String;
}

// {
// 	"projectName": "New Model Test Project",
// 	"projectDescription": "New Model",
// 	"projectMembers": ["5aca5d1fbe8b0e27d5c2ae81"],
// 	"repositoryLink": "www.github.com/projectportal",
// 	"owner": "5aca5d1fbe8b0e27d5c2ae81",
// 	"techStack": ["NodeJS", "Express", "Angular5"],
// 	"projectDemo": "www.projectDemo.com",
// 	"labels": ["MEAN Stack", "Project Management"]
// }
