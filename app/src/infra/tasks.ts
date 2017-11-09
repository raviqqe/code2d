import { ITask } from "common/domain/task";
import * as _ from "lodash";

import storage from "./storage";

export const tasksRepository = storage.statefulItemsRepository<ITask>("tasks");
