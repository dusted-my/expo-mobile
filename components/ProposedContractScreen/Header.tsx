import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { IContract, ICustomer } from "../../interfaces";
import ContractStatus from "../ContractStatus";

interface Props {
  cleaner: ICustomer;
  contract: IContract;
}
const Header = (props: Props) => {
  const { cleaner, contract } = props;

  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../../assets/dusted.png")} />
      <Text style={styles.page}>Contract Details</Text>
      <View>
        <Image style={styles.profile} source={{ uri: cleaner.imageUrl }} />
        <Text style={styles.name}>{cleaner.fullName}</Text>
      </View>
      <Text>Total:</Text>
      <Text style={styles.price}>RM {contract.total.toFixed(2)}</Text>
      <ContractStatus status={contract.status} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 26,
  },
  main: {
    marginTop: 32,
  },
  page: {
    fontSize: 20,
    paddingTop: 40,
  },
  profile: {
    height: 111,
    width: 111,
    borderRadius: 100,
    alignItems: "center",
    marginVertical: 20,
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    paddingBottom: 16,
  },
  price: {
    fontSize: 24,
    paddingVertical: 18,
    fontWeight: "500",
  },
});

export default Header;
