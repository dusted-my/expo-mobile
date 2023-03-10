import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Divider } from "react-native-paper";
import { IContract, ICustomer } from "../../interfaces";
import ContractStatus from "../ContractStatus";

interface Props {
  cleaner: ICustomer;
  contract: IContract;
  goCleaner: () => void;
}
const Header = (props: Props) => {
  const { cleaner, contract, goCleaner } = props;

  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../../assets/dusted.png")} />
      <Text style={styles.title}>Contract Details</Text>
      <View>
        <Image style={styles.profile} source={{ uri: cleaner.imageUrl }} />
        <Text style={styles.name}>{cleaner.fullName}</Text>
        <Button mode="text" onPress={() => goCleaner()}>
          View Profile
        </Button>
      </View>
      <Divider style={styles.divider} />
      <Text>Total:</Text>
      <Text style={styles.price}>RM {contract.total.toFixed(2)}</Text>
      <ContractStatus status={contract.status} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 26,
  },
  title: {
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
    fontWeight: "500",
  },
  divider: {
    width: "100%",
    marginVertical: 16,
  },
  price: {
    fontSize: 24,
    paddingVertical: 18,
    fontWeight: "500",
  },
});

export default Header;
