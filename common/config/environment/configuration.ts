import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";
import assert from "assert";
import * as process from "process";

export default () => {
  assert(["local", "dev", "prod"].includes(process.env.NODE_ENV));

  const configFilePath = join(process.cwd(), "common", "config", "environment", `.env.${process.env.NODE_ENV}.yml`);

  const environmentConfig = yaml.load(readFileSync(configFilePath, "utf8")) as Record<string, any>;
  environmentConfig.server.environment = process.env.NODE_ENV === "local" ? "local" : process.env.NODE_ENV === "dev" ? "dev" : "prod";

  return environmentConfig;
};
