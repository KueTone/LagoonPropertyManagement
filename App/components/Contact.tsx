import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Input, Button } from "@rneui/themed";

export default function Contact() {
  return (
    <View>
      <Input placeholder="Your Email" />
      <Input placeholder="Property Interested" />
      <Input placeholder="Subject" />
      <Input placeholder="Inquiry" />
    </View>
  );
}

// type House = {
//   id: number;
//   address: string;
//   city: string;
//   state: string;
//   price: number;
//   beds: number;
//   baths: number;
//   size: number;
// };

// export default function AddItem() {
//   const [houses, setHouses] = useState<House[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [price, setPrice] = useState(0);
//   const [beds, setBeds] = useState(0);
//   const [baths, setBaths] = useState(0);
//   const [size, setSize] = useState(0);

//   useEffect(() => {
//     addHouses();
//   }, []);

//   async function addHouses() {
//     setLoading(true);
//     const { data, error } = await supabase.from("house").insert({
//       address: address,
//       city: city,
//       state: state,
//       price: price,
//       beds: beds,
//       baths: baths,
//       size: size,
//     });

//     console.log("Supabase data:", data);
//     console.log("Supabase error:", error);

//     if (error) {
//       //       Alert.alert("Error fetching houses", error.message);
//       console.error(error.message);
//       setErrorMessage(error.message);
//       setLoading(false);
//       return;
//     }
//     setErrorMessage("");
//     if (data) {
//       setHouses(data);
//     }
//     setLoading(false);
//   }
//   return (
//     <View>
//       <Input placeholder="address"/>
//       <Input placeholder="city"/>
//       <Input placeholder="state"/>
//       <Input placeholder="price"/>
//       <Input placeholder="beds"/>
//       <Input placeholder="baths"/>
//       <Input placeholder="size"/>
//       <Text>AddItem</Text>
//     </View>
//   );
// }
