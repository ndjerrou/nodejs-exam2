import { join, resolve } from "path";

const __dirname = join(resolve());

// PATH
export const LIBRARY_PATH = __dirname + "/data/library.json";
export const USER_PATH = __dirname + "/data/users.json";

// SUCCESS
export const serverRun = "------Run on port 3000------"
export const SUCESS_STATUS = "SUCESS";
export const USER_CREATED_SUCCESS = "User created correctly";
export const BOOK_CREATED_SUCCESS = "Book created correctly";
export const BOOK_UPDATED_SUCCESS = "Book updated correctly";
export const BOOK_DELETED_SUCCESS = "Book deleted correctly";

// ERROR
export const ERROR_STATUS = "ERROR";
export const INVALID_PARAMETERS = "Invalid parameters sent";
export const INVALID_ID = "Invalid id provided";
export const INVALID_LOGIN = "Incorrect username or password";
export const EMAIL_ALREADY_USE = "Email already use";
export const MISSING_TOKEN = "You need token";
