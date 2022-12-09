import { AppFile1, AppFile2 } from "./models";
import { createStateContext } from "react-use";
import { useEffect, useState } from "react";

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
}

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

const [useAppData, SharedAppDataProvider] = createStateContext<AppFile2>(newAppFile2);
const [useAppImageAgents, SharedAppImageAgentsProvider] = createStateContext(appImageAgents);


export * from "./models";
export { useAppData, SharedAppDataProvider };
export { useAppImageAgents, SharedAppImageAgentsProvider };