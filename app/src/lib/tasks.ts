import { ITask } from "common/domain/task";
import * as _ from "lodash";

import StatefulItemsRepository from "./stateful-items-repository";

const repository = new StatefulItemsRepository<ITask>("tasks");

export const tasksRepository = repository.state;
