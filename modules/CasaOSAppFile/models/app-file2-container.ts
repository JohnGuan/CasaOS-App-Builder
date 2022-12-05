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
import { AppFile2ContainerConstraints } from './app-file2-container-constraints';
import { AppFile2ContainerDevices } from './app-file2-container-devices';
import { AppFile2ContainerEnvs } from './app-file2-container-envs';
import { AppFile2ContainerLabels } from './app-file2-container-labels';
import { AppFile2ContainerPorts } from './app-file2-container-ports';
import { AppFile2ContainerVolumes } from './app-file2-container-volumes';
import { AppFile2ContainerWebUi } from './app-file2-container-web-ui';
/**
 * Container of this App
 * @export
 * @interface AppFile2Container
 */
export interface AppFile2Container {
    /**
     * Image of the container
     * @type {string}
     * @memberof AppFile2Container
     */
    image?: string;
    /**
     * Shell of the container
     * @type {string}
     * @memberof AppFile2Container
     */
    shell?: string;
    /**
     * Privileged of the container
     * @type {boolean}
     * @memberof AppFile2Container
     */
    privileged?: boolean;
    /**
     * Network model of the container
     * @type {string}
     * @memberof AppFile2Container
     */
    networkModel?: string;
    /**
     * 
     * @type {AppFile2ContainerWebUi}
     * @memberof AppFile2Container
     */
    webUi?: AppFile2ContainerWebUi;
    /**
     * Health check of the container
     * @type {string}
     * @memberof AppFile2Container
     */
    healthCheck?: string;
    /**
     * Envs of the container
     * @type {Array<AppFile2ContainerEnvs>}
     * @memberof AppFile2Container
     */
    envs?: Array<AppFile2ContainerEnvs>;
    /**
     * Ports of the container
     * @type {Array<AppFile2ContainerPorts>}
     * @memberof AppFile2Container
     */
    ports?: Array<AppFile2ContainerPorts>;
    /**
     * Volumes of the container
     * @type {Array<AppFile2ContainerVolumes>}
     * @memberof AppFile2Container
     */
    volumes?: Array<AppFile2ContainerVolumes>;
    /**
     * Devices of the container
     * @type {Array<AppFile2ContainerDevices>}
     * @memberof AppFile2Container
     */
    devices?: Array<AppFile2ContainerDevices>;
    /**
     * 
     * @type {AppFile2ContainerConstraints}
     * @memberof AppFile2Container
     */
    constraints?: AppFile2ContainerConstraints;
    /**
     * Restart policy of the container
     * @type {string}
     * @memberof AppFile2Container
     */
    restartPolicy?: AppFile2ContainerRestartPolicyEnum;
    /**
     * Sysctls of the container
     * @type {Array<string>}
     * @memberof AppFile2Container
     */
    sysctls?: Array<string>;
    /**
     * Capabilities to add of the container https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities 
     * @type {Array<string>}
     * @memberof AppFile2Container
     */
    capAdd?: Array<string>;
    /**
     * Labels of the container
     * @type {Array<AppFile2ContainerLabels>}
     * @memberof AppFile2Container
     */
    labels?: Array<AppFile2ContainerLabels>;
}

/**
    * @export
    * @enum {string}
    */
export enum AppFile2ContainerRestartPolicyEnum {
    Always = 'always',
    UnlessStopped = 'unless-stopped',
    OnFailure = 'on-failure',
    No = 'no'
}

