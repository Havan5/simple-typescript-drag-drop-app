namespace App {

    // component base class
    // this will be reused and shouldn't be initialized
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;

        constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement; // '!' is same as adding if statement and checking templateElement exist?
            this.hostElement = document.getElementById(hostElementId)! as T;
            const importNode = document.importNode(this.templateElement.content, true);
            this.element = importNode.firstElementChild as U;
            if (newElementId) {
                this.element.id = newElementId;
            }

            this.attach(insertAtStart)
        }

        private attach(insertAtStart: boolean) {
            this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }

        abstract configure(): void;
        abstract renderContent(): void;
    }
}