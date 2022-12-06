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

const [useAppData, SharedAppDataProvider] = createStateContext<AppFile2>({
  version: "2.0",
} as AppFile2);

export * from "./models";
export { useAppData, SharedAppDataProvider };
