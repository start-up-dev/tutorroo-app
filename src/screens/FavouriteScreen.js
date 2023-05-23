import { SafeAreaView, ScrollView, Text } from "react-native";
import { Color } from "../const/color";
import TutorCard from "../components/common/TutorCard";
import Space from "../components/common/Space";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../api/tutor";

const FavouriteScreen = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.tutor.wishlist);

  useEffect(() => {
    if (wishlist === null) {
      dispatch(getWishlist());
    }
  });
  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={10} />

        {/* {wishlist?.map((item) => (
          <TutorCard key={item._id} data={item} />
        ))} */}

        <TutorCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
