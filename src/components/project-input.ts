/// <reference path="base-component.ts"/>

namespace App {
    // Project input class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input')

            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

            this.configure();
        }

        configure() {
            //using bing
            // this.element.addEventListener('submit', this.submitHandler.bind(this));

            //using decorator
            this.element.addEventListener('submit', this.submitHandler);
        }

        renderContent() { }

        private gathreUserInput(): [string, string, number] | void {
            const title = this.titleInputElement.value;
            const description = this.descriptionInputElement.value;
            const people = this.peopleInputElement.value;

            const titleValidatable: validatable = {
                value: title,
                required: true
            }
            const descriptionValidatable: validatable = {
                value: description,
                required: true,
            }
            const peopleValidatable: validatable = {
                value: +people,
                required: true,
            }
            // if (title.trim().length === 0 || description.trim().length === 0, people.trim().length === 0) {
            //better way to do validation
            if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
                alert('invalid input, please try again!')
                return;
            } else {
                return [title, description, +people];
            }
        }

        // private clearInput() {
        //     this.titleInputElement.value = '';
        //     this.descriptionInputElement.value = '';
        //     this.peopleInputElement.value = '';
        // }

        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gathreUserInput();
            // need to check userInput as isArray becuase the method above return tuple
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectState.addProject(title, description, people)
                // this.clearInput();
            }
        }
    }
}