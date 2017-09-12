import StatefulItemsRepository from "./stateful_items_repository";

export interface IArticle {
    title: string;
    uri: string;
}

const repository = new StatefulItemsRepository<IArticle>("articles");

export const articlesRepository = repository.state;
