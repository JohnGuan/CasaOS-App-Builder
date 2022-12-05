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
/**
 * 
 * @export
 * @interface AppFile2ContainerVolumes
 */
export interface AppFile2ContainerVolumes {
    /**
     * Container path of the container
     * @type {string}
     * @memberof AppFile2ContainerVolumes
     */
    container?: string;
    /**
     * Host path of the container
     * @type {string}
     * @memberof AppFile2ContainerVolumes
     */
    host?: string;
    /**
     * Mode of the volume
     * @type {string}
     * @memberof AppFile2ContainerVolumes
     */
    mode?: AppFile2ContainerVolumesModeEnum;
    /**
     * Allocation of the volume - required: This file/directory must be present to continue mounting the volume and installing it. - optional: If this file/directory is present, mount the volume, if not, do not mount it. Both can continue with the install. - automatic: Follow the processing logic of container, mount the volume if file/directory is present, create the directory and mount it if not. 
     * @type {string}
     * @memberof AppFile2ContainerVolumes
     */
    allocation?: AppFile2ContainerVolumesAllocationEnum;
    /**
     * Configurable of the volume - no: Not configurable - basic: Configurable in basic mode - advanced: Configurable in advanced mode 
     * @type {string}
     * @memberof AppFile2ContainerVolumes
     */
    configurable?: AppFile2ContainerVolumesConfigurableEnum;
    /**
     * Description of the volume
     * @type {string}
     * @memberof AppFile2ContainerVolumes
     */
    description?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum AppFile2ContainerVolumesModeEnum {
    Ro = 'ro',
    Rw = 'rw'
}
/**
    * @export
    * @enum {string}
    */
export enum AppFile2ContainerVolumesAllocationEnum {
    Required = 'required',
    Optional = 'optional',
    Automatic = 'automatic'
}
/**
    * @export
    * @enum {string}
    */
export enum AppFile2ContainerVolumesConfigurableEnum {
    No = 'no',
    Basic = 'basic',
    Advanced = 'advanced'
}
