import { serverHttp } from "./app";
import { logger } from "./src/utils/logger";


serverHttp.listen(4000, function(){
  logger.info(`app is running.`);
});