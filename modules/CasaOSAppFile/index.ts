import { AppFile1, AppFile2 } from "./models";
import { createStateContext } from "react-use";

export const appCategory = [
  {
    name: "Analytics",
    icon: "chart-areaspline",
    description: "Analysis Apps",
  },
  {
    name: "Backup",
    icon: "backup-restore",
    description: "File and Data Backup Apps",
  },
  {
    name: "Blog",
    icon: "post-outline",
    description: "Blog Writing and Distribution Apps",
  },
  {
    name: "Chat",
    icon: "chat-processing-outline",
    description: "Chat Apps",
  },
  {
    name: "Cloud",
    icon: "cloud-outline",
    description: "Public cloud alternatives or enhanced Apps",
  },
  {
    name: "Developer",
    icon: "code-greater-than-or-equal",
    description: "Developer Apps",
  },
  {
    name: "CRM",
    icon: "account-box-outline",
    description: "CRM Apps",
  },
  {
    name: "Documents",
    icon: "file-document-outline",
    description: "Document editing Apps",
  },
  {
    name: "Email",
    icon: "email-outline",
    description: "Email Apps",
  },
  {
    name: "File Sync",
    icon: "file-sync-outline",
    description: "File Sync Apps",
  },
  {
    name: "Finance",
    icon: "currency-usd",
    description: "Finance Apps",
  },
  {
    name: "Forum",
    icon: "forum-outline",
    description: "Forum Apps",
  },
  {
    name: "Gallery",
    icon: "image",
    description: "Gallery Apps",
  },
  {
    name: "Games",
    icon: "google-controller",
    description: "Games Apps",
  },
  {
    name: "Learning",
    icon: "school-outline",
    description: "Learning Apps",
  },
  {
    name: "Media",
    icon: "play-circle-outline",
    description: "Media Apps",
  },
  {
    name: "Notes",
    icon: "note-edit-outline",
    description: "Notes Apps",
  },
  {
    name: "Project Management",
    icon: "chart-gantt",
    description: "Project Management Apps",
  },
  {
    name: "VPN",
    icon: "vpn",
    description: "VPN Apps",
  },
  {
    name: "WEB",
    icon: "web",
    description: "WEB Apps",
  },
  {
    name: "WiKi",
    icon: "book-open-page-variant-outline",
    description: "WiKi Apps",
  },
  {
    name: "Dapps",
    icon: "vector-link",
    description: "Decentralized Apps",
  },
  {
    name: "Downloader",
    icon: "tray-arrow-down",
    description: "Downloader Apps",
  },
  {
    name: "Utilities",
    icon: "toolbox-outline",
    description: "Utilities Apps",
  },
  {
    name: "Home Automation",
    icon: "home-automation",
    description: "Home Automation Apps",
  },
  {
    name: "Network",
    icon: "lan",
    description: "Network Apps",
  },
];

export const appCaps = [
  "AUDIT_CONTROL",
  "AUDIT_READ",
  "BLOCK_SUSPEND",
  "BPF",
  "CHECKPOINT_RESTORE",
  "DAC_READ_SEARCH",
  "IPC_LOCK",
  "IPC_OWNER",
  "LEASE",
  "LINUX_IMMUTABLE",
  "MAC_ADMIN",
  "MAC_OVERRIDE",
  "NET_ADMIN",
  "NET_BROADCAST",
  "PERFMON",
  "SYS_ADMIN",
  "SYS_BOOT",
  "SYS_MODULE",
  "SYS_NICE",
  "SYS_PACCT",
  "SYS_PTRACE",
  "SYS_RAWIO",
  "SYS_RESOURCE",
  "SYS_TIME",
  "SYS_TTY_CONFIG",
  "SYSLOG",
  "WAKE_ALARM",
];

export const appImageAgents = {
  icon: "",
  thumbnail: "",
  screenshots: ["", "", ""],
};

export const newAppFile2: AppFile2 = {
  version: "2.0",
  title: "",
  name: "",
  icon: "",
  tagline: "",
  overview: "",
  thumbnail: "",
  screenshots: ["", "", ""],
  category: [],
  developer: {
    name: "",
    website: "",
    donate_text: "",
    donate_url: "",
  },
  adaptor: {
    name: "",
    website: "",
    donate_text: "",
    donate_url: "",
  },
  container: {
    image: "",
    shell: "",
    privileged: false,
    health_check: "",
    network_model: "bridge",
    web_ui: {
      http: "",
      https: "",
      path: "",
    },
    ports: [],
    volumes: [],
    devices: [],
    envs: [],
    cap_add: [],
    restart_policy: "unless-stopped" as any,
    cmd: [],
    constraints: {
      min_memory: 64,
      min_storage: 128,
    },
  },
  tips: {
    before_install: [],
  },
  changelog: {
    latest_updates: "",
    url: "",
  },
  latest_update_date: "",
};

export function fillAppFile1ToAppData(
  appFile1: AppFile1 | any,
  appData: any
): AppFile2 {
  return {
    ...appData,
    version: "2.0",
    title: appFile1.label || "",
    name: appFile1.label?.toLowerCase() || "",
    icon: appFile1.icon || "",
    overview: appFile1.description || "",
    container: {
      ...appData.container,
      image: appFile1.image || "",
      privileged: appFile1.privileged || false,
      network_model: appFile1.network_model || "bridge",
      web_ui: {
        ...appData.container?.web_ui,
        path: appFile1.index || "",
      },
      ports:
        appFile1.ports?.map(
          (port: { container: any; host: any; protocol: any; desc: any }) => ({
            container: port.container || "",
            host: port.host || "",
            type: port.protocol || "tcp",
            allocation: "automatic",
            configurable: "basic",
            description: port.desc || "",
          })
        ) || [],
      volumes:
        appFile1.volumes?.map(
          (volume: { container: any; host: any; desc: any }) => ({
            container: volume.container || "",
            host: volume.host || "",
            mode: "rw",
            allocation: "automatic",
            configurable: "basic",
            description: volume.desc || "",
          })
        ) || [],
      devices:
        appFile1.devices?.map(
          (device: { container: any; host: any; desc: any }) => ({
            container: device.container || "",
            host: device.host || "",
            allocation: "optional",
            configurable: "basic",
            description: device.desc || "",
          })
        ) || [],
      envs:
        appFile1.envs?.map((env: { container: any; host: any; desc: any }) => ({
          key: env.container || "",
          value: env.host || "",
          allocation: "optional",
          configurable: "basic",
          description: env.desc || "",
        })) || [],
      cap_add: appFile1.cap_add || [],
      restart_policy: appFile1.restart || "unless-stopped",
      cmd: appFile1.cmd || [],
    },
  };
}

export function fillAppFile2ToAppData(
  appFile2: AppFile2 | any,
  appData: any
): AppFile2 {
  return {
    ...appData,
    version: "2.0",
    title: appFile2.title ? appFile2.title : appData.title || "",
    name: appFile2.name ? appFile2.name : appData.name || "",
    icon: appFile2.icon ? appFile2.icon : appData.icon || "",
    tagline: appFile2.tagline ? appFile2.tagline : appData.tagline || "",
    overview: appFile2.overview ? appFile2.overview : appData.overview || "",
    thumbnail: appFile2.thumbnail ? appFile2.thumbnail : appData.thumbnail || "",
    screenshots: appFile2.screenshots ? appFile2.screenshots : appData.screenshots || ["", "", ""],
    category: appFile2.category ? appFile2.category : appData.category || [],
    developer: {
      name: appFile2.developer?.name ? appFile2.developer.name : appData.developer.name || "",
      website: appFile2.developer?.website ? appFile2.developer.website : appData.developer.website || "",
      donate_text: appFile2.developer?.donate_text ? appFile2.developer.donate_text : appData.developer.donate_text || "",
      donate_url: appFile2.developer?.donate_url ? appFile2.developer.donate_url : appData.developer.donate_url || "",
    },
    adaptor: {
      name: appFile2.adaptor?.name ? appFile2.adaptor.name : appData.adaptor.name || "",
      website: appFile2.adaptor?.website ? appFile2.adaptor.website : appData.adaptor.website || "",
      donate_text: appFile2.adaptor?.donate_text ? appFile2.adaptor.donate_text : appData.adaptor.donate_text || "",
      donate_url: appFile2.adaptor?.donate_url ? appFile2.adaptor.donate_url : appData.adaptor.donate_url || "",
    },
    container: {
      image: appFile2.container?.image ? appFile2.container.image : appData.container.image || "",
      shell: appFile2.container?.shell ? appFile2.container.shell : appData.container.shell || "",
      privileged: appFile2.container?.privileged ? appFile2.container.privileged : appData.container.privileged || false,
      health_check: appFile2.container?.health_check ? appFile2.container.health_check : appData.container.health_check || "",
      network_model: appFile2.container?.network_model ? appFile2.container.network_model : appData.container.network_model || "bridge",
      web_ui: {
        http: appFile2.container?.web_ui?.http ? appFile2.container.web_ui.http : appData.container.web_ui.http || "",
        https: appFile2.container?.web_ui?.https ? appFile2.container.web_ui.https : appData.container.web_ui.https || "",
        path: appFile2.container?.web_ui?.path ? appFile2.container.web_ui.path : appData.container.web_ui.path || "",
      },
      ports: appFile2.container?.ports ? appFile2.container.ports : appData.container.ports || [],
      volumes: appFile2.container?.volumes ? appFile2.container.volumes : appData.container.volumes || [],
      devices: appFile2.container?.devices ? appFile2.container.devices : appData.container.devices || [],
      envs: appFile2.container?.envs ? appFile2.container.envs : appData.container.envs || [],
      cap_add: appFile2.container?.cap_add ? appFile2.container.cap_add : appData.container.cap_add || [],
      restart_policy: appFile2.container?.restart_policy ? appFile2.container.restart_policy : appData.container.restart_policy || "unless-stopped",
      cmd: appFile2.container?.cmd ? appFile2.container.cmd : appData.container.cmd || [],
      constraints: {
        min_memory: appFile2.container?.constraints?.min_memory ? appFile2.container.constraints.min_memory : appData.container.constraints.min_memory || 64,
        min_storage: appFile2.container?.constraints?.min_storage ? appFile2.container.constraints.min_storage : appData.container.constraints.min_storage || 128,
      },
    },
    tips: {
      before_install: appFile2.tips?.before_install ? appFile2.tips.before_install : appData.tips.before_install || "",
    },
    changelog: {
      latest_updates: appFile2.changelog?.latest_updates ? appFile2.changelog.latest_updates : appData.changelog.latest_updates || [],
      url: appFile2.changelog?.url ? appFile2.changelog.url : appData.changelog.url || "",
    },
  };
}

const [useAppData, SharedAppDataProvider] =
  createStateContext<AppFile2>(newAppFile2);
const [useAppImageAgents, SharedAppImageAgentsProvider] =
  createStateContext(appImageAgents);

export * from "./models";
export { useAppData, SharedAppDataProvider };
export { useAppImageAgents, SharedAppImageAgentsProvider };
