"use client";

import { Flex } from "@chakra-ui/react";
import { Chain, mainnet, sepolia } from "wagmi/chains";
import { MenuContent, MenuItem } from "../ui/menu";
import { NetworkSymbolComponent } from "../icons/NetworkSymbol";

interface INetworkListComponentProps {
  onSelectNetwork: (chainId: number) => Promise<void>;
}

export const NetworkListComponent: React.FC<INetworkListComponentProps> = ({
  onSelectNetwork,
}) => {
  const chains = [mainnet, sepolia];
  return (
    <MenuContent
      display={"flex"}
      flexDir={"column"}
      py={"8px"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      gap={"12px"}
      width={"192px"}
      borderRadius={"6px"}
      bgColor={"#101217"}
      border={"1px solid #25282F"}
    >
      {chains.map((chain: Chain) => (
        <MenuItem
          key={chain.id}
          onClick={async () => {
            await onSelectNetwork(chain.id);
          }}
          value={chain.name}
          width={"192px"}
          height={"40px"}
          px={"12px"}
          py={"6px"}
          fontSize={"14px"}
          fontWeight={500}
          bgColor={"transparent"}
          _hover={{ bgColor: "#1D1F25" }}
          justifyContent={"flex-start"}
          color={"#FFFFFF"}
          cursor={"pointer"}
        >
          <Flex gap={"8px"} alignItems={"center"}>
            <NetworkSymbolComponent chainId={chain.id} height={20} width={20} />
            {chain.name}
          </Flex>
        </MenuItem>
      ))}
    </MenuContent>
  );
};
