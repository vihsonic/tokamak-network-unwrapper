"use client";

import { jotaiIsInsufficient } from "@/jotai/bridge";
import { ButtonProps, Flex, Input, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { getParsedAmount, trimTokenBalance } from "@/utils/token-balance";
import { useTokenBalance } from "@/hooks/bridge/useTokenBalance";
import { getWrapUnwrapToken } from "@/utils/bridge";
import { useWalletConnect } from "@/hooks/wallet-connect/useWalletConnect";
import { jotaiWrapUnwrapTransactionInfo } from "@/jotai/wrap-unwrap";
import { WrapUnwrapTransactionInfo } from "@/types/wrap-unwrap";
import { FromTokenIcon, FromTokenName } from "@/constants/wrap-unwrap";
import Image from "next/image";

export const MaxBalanceButtonComponent: React.FC<ButtonProps> = (props) => {
  const { onClick, disabled } = props;
  return (
    <Button
      height={"fit-content"}
      px={"4px"}
      py={"2px"}
      justifyContent={"center"}
      color={"#0070ED"}
      bgColor={"#000710"}
      _hover={{ bgColor: "#101217" }}
      borderRadius={"6px"}
      fontSize={"12px"}
      fontWeight={600}
      lineHeight={"normal"}
      onClick={onClick}
      disabled={disabled}
    >
      Max
    </Button>
  );
};

export const TokenInputComponent: React.FC = () => {
  const [transaction, setTransaction] = useAtom(jotaiWrapUnwrapTransactionInfo);
  const { balance } = useTokenBalance(transaction);
  const { isConnected, chain } = useWalletConnect();
  const [, setIsInsufficient] = useAtom(jotaiIsInsufficient);
  useEffect(() => {
    if (balance && transaction.amount > balance.value) setIsInsufficient(true);
    else setIsInsufficient(false);
  }, [balance, transaction.amount, setIsInsufficient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value === "." ? "0." : e.target.value;
    const wrapUnwrapToken = getWrapUnwrapToken(transaction);
    const decimalPattern = new RegExp(
      `^\\d+(\\.\\d{0,${wrapUnwrapToken?.decimals}})?$`
    );
    if (!decimalPattern.test(value) && value !== "") return;
    const amount =
      value.length === 0
        ? BigInt(0)
        : getParsedAmount(value, wrapUnwrapToken?.decimals ?? 18);
    if (balance && amount > balance.value) setIsInsufficient(true);
    else setIsInsufficient(false);
    setTransaction((prev: WrapUnwrapTransactionInfo) => ({
      ...prev,
      formatted: value,
      amount,
    }));
  };
  const handleMaxButtonClick = () => {
    setTransaction((prev: WrapUnwrapTransactionInfo) => ({
      ...prev,
      formatted: balance?.formatted ?? "0",
      amount: balance?.value ?? BigInt(0),
    }));
  };
  return (
    <Flex flexDir={"column"} gap={"6px"}>
      <Text color={"#8C8F97"} fontWeight={400}>
        You send
      </Text>
      <Flex
        width={"440px"}
        height={"96px"}
        p={"16px 12px 11.5px 20px"}
        bgColor={"#1D1F25"}
        borderRadius={"6px"}
        flexDir={"column"}
        border={"1px solid transparent"}
        _hover={{ border: "1px solid #555A64" }}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Input
            truncate
            width={"100%"}
            maxWidth={"298px"}
            height={"48px"}
            borderRadius={"6px"}
            bgColor={"#1D1F25"}
            fontSize={"32px"}
            fontWeight={500}
            lineHeight={"normal"}
            placeholder="0"
            value={transaction.formatted}
            border={"1px solid transparent"}
            _focus={{ outline: "none" }}
            onChange={handleChange}
          />
          <Flex alignItems={"center"} gap={"8px"} mr={"8px"}>
            <Image
              src={FromTokenIcon[transaction.mode]}
              alt="ton"
              width={24}
              height={24}
            />
            <Text fontSize={"16px"} fontWeight={500} lineHeight={"normal"}>
              {FromTokenName[transaction.mode]}
            </Text>
          </Flex>
        </Flex>
        {isConnected && chain && (
          <Flex gap={"6px"} alignItems={"center"} justifyContent={"flex-end"}>
            <Text fontWeight={400} color={"#8C8F97"}>
              {`Balance: ${trimTokenBalance(balance?.formatted ?? "0", 2)}`}
            </Text>
            <MaxBalanceButtonComponent
              onClick={handleMaxButtonClick}
              disabled={balance?.value === transaction.amount}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
