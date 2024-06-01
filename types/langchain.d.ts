declare module 'langchain' {
    export class Chain {
      constructor(config: any);
      execute(input: any): Promise<any>;
    }
}