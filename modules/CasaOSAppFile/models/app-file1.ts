/* tslint:disable */
/* eslint-disable */
/**
 * CasaOS AppFile
 * <p>   Currently the main role of OpenAPI is to define CasaOS App File schemas. </p>
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AppFile1Envs } from './app-file1-envs';
import { AppFile1Ports } from './app-file1-ports';
import { AppFile1Volumes } from './app-file1-volumes';
/**
 * 
 * @export
 * @interface AppFile1
 */
export interface AppFile1 {
    /**
     * Used to identify the version of CasaOS AppFile to do compatibility adaptations
     * @type {string}
     * @memberof AppFile1
     */
    version?: string;
    /**
     * Container name for container runtime.
     * @type {string}
     * @memberof AppFile1
     */
    container_name?: string;
    /**
     * Icon for the Dashboard.
     * @type {string}
     * @memberof AppFile1
     */
    icon?: string;
    /**
     * Container image with tag
     * @type {string}
     * @memberof AppFile1
     */
    image?: string;
    /**
     * Protocol.
     * @type {string}
     * @memberof AppFile1
     */
    protocol?: AppFile1ProtocolEnum;
    /**
     * Host of the App.
     * @type {string}
     * @memberof AppFile1
     */
    host?: string;
    /**
     * Port map.
     * @type {string}
     * @memberof AppFile1
     */
    port_map?: string;
    /**
     * Path of the WebUI.
     * @type {string}
     * @memberof AppFile1
     */
    index?: string;
    /**
     * Envs.
     * @type {Array<AppFile1Envs>}
     * @memberof AppFile1
     */
    envs?: Array<AppFile1Envs>;
    /**
     * Ports.
     * @type {Array<AppFile1Ports>}
     * @memberof AppFile1
     */
    ports?: Array<AppFile1Ports>;
    /**
     * Volumes.
     * @type {Array<AppFile1Volumes>}
     * @memberof AppFile1
     */
    volumes?: Array<AppFile1Volumes>;
    /**
     * Devices.
     * @type {Array<AppFile1Volumes>}
     * @memberof AppFile1
     */
    devices?: Array<AppFile1Volumes>;
    /**
     * CPU shares.
     * @type {number}
     * @memberof AppFile1
     */
    cpu_shares?: AppFile1CpuSharesEnum;
    /**
     * Memory.
     * @type {number}
     * @memberof AppFile1
     */
    memory?: number;
    /**
     * Restart.
     * @type {string}
     * @memberof AppFile1
     */
    restart?: AppFile1RestartEnum;
    /**
     * Title of the App.
     * @type {string}
     * @memberof AppFile1
     */
    label?: string;
    /**
     * Description.
     * @type {string}
     * @memberof AppFile1
     */
    description?: string;
    /**
     * Position.
     * @type {number}
     * @memberof AppFile1
     */
    position?: number;
    /**
     * Host name.
     * @type {string}
     * @memberof AppFile1
     */
    host_name?: string;
    /**
     * Privileged.
     * @type {boolean}
     * @memberof AppFile1
     */
    privileged?: boolean;
    /**
     * Cap add.
     * @type {Array<string>}
     * @memberof AppFile1
     */
    cap_add?: Array<string>;
    /**
     * Cmd.
     * @type {Array<string>}
     * @memberof AppFile1
     */
    cmd?: Array<string>;
}

/**
    * @export
    * @enum {string}
    */
export enum AppFile1ProtocolEnum {
    Http = 'http',
    Https = 'https'
}
/**
    * @export
    * @enum {string}
    */
export enum AppFile1CpuSharesEnum {
    NUMBER_10 = 10,
    NUMBER_50 = 50,
    NUMBER_90 = 90
}
/**
    * @export
    * @enum {string}
    */
export enum AppFile1RestartEnum {
    Always = 'always',
    OnFailure = 'on-failure',
    UnlessStopped = 'unless-stopped'
}

