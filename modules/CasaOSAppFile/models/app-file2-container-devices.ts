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
 * @interface AppFile2ContainerDevices
 */
export interface AppFile2ContainerDevices {
    /**
     * Device path of the container
     * @type {string}
     * @memberof AppFile2ContainerDevices
     */
    container?: string;
    /**
     * Device path of the host
     * @type {string}
     * @memberof AppFile2ContainerDevices
     */
    host?: string;
    /**
     * Allocation of the device - required: Continue installing app only if this device is available. - optional: If this device is present, mount the device, if not, do not mount it. Both can continue with the install. 
     * @type {string}
     * @memberof AppFile2ContainerDevices
     */
    allocation?: AppFile2ContainerDevicesAllocationEnum;
    /**
     * Configurable of the device - no: Not configurable - basic: Configurable in basic mode - advanced: Configurable in advanced mode 
     * @type {string}
     * @memberof AppFile2ContainerDevices
     */
    configurable?: AppFile2ContainerDevicesConfigurableEnum;
    /**
     * Description of the device
     * @type {string}
     * @memberof AppFile2ContainerDevices
     */
    description?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum AppFile2ContainerDevicesAllocationEnum {
    Required = 'required',
    Optional = 'optional'
}
/**
    * @export
    * @enum {string}
    */
export enum AppFile2ContainerDevicesConfigurableEnum {
    No = 'no',
    Basic = 'basic',
    Advanced = 'advanced'
}
