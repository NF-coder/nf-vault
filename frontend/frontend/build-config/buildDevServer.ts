import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        allowedHosts: 'all',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
        compress: true,
        port: options.port ?? 3000,
        open: true,
        // если раздавать статику через nginx То надо делать проксирование на Index.html
        historyApiFallback: true,
        hot: true
    }
}