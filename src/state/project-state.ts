namespace App {
    // listener which is a function
    type Listener<T> = (items: T[]) => void;

    class State<T> {
        protected listeners: Listener<T>[] = [];

        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    // project state management
    export class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
        }

        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new ProjectState();
        }

        addProject(title: string, description: string, numPeople: number) {
            const newProject = new Project(Math.random().toString(), title, description, numPeople, ProjectStatus.Active);
            this.projects.push(newProject);

            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }

        updateListeners() {
            for (const listnerFn of this.listeners) {
                listnerFn(this.projects.slice());
            }
        }
    }

    // we will have only one instance of this class
    export const projectState = ProjectState.getInstance();
}