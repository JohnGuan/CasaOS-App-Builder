import Head from "next/head";
import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Layout/Navbar";
import Main from "../components/Layout/Main";
import {
  SharedAppDataProvider,
  SharedCurrentAppIDProvider,
  SharedAppImageAgentsProvider,
  SharedCurrentAppType,
  SharedAppStoreAppListProvider,
} from "../modules/CasaOSAppFile";

export default function Home() {
  return (
    <SharedAppDataProvider>
      <SharedAppImageAgentsProvider>
        <SharedCurrentAppIDProvider>
          <SharedCurrentAppType>
            <SharedAppStoreAppListProvider>
              <Flex direction="column" flex="1" height="100vh">
                <Head>
                  <title>CasaOS App Builder</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Navbar />
                <Main />
              </Flex>
            </SharedAppStoreAppListProvider>
          </SharedCurrentAppType>
        </SharedCurrentAppIDProvider>
      </SharedAppImageAgentsProvider>
    </SharedAppDataProvider>
  );
}
