import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  re,
} from "react-native";
import { Color } from "../const/color";
import TutorCard from "../components/common/TutorCard";
import Space from "../components/common/Space";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../api/tutor";
import Loader from "../components/common/Loader";
import Icon from "../components/common/Icon";

const sadIcon = require("../../assets/images/emoji-sad.png");

const FavouriteScreen = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.tutor.wishlist);
  const status = useSelector((state) => state.tutor.status);

  const onRefresh = useCallback(() => {
    dispatch(getWishlist());
  }, []);

  useEffect(() => {
    if (wishlist === null) {
      dispatch(getWishlist());
    }
  }, [wishlist]);

  return (
    <SafeAreaView style={{ backgroundColor: Color.background, flex: 1 }}>
      <Loader visible={status === "loading" ? true : false} />
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={status == "loading"}
            tintColor={Color.primaryDeep}
            onRefresh={onRefresh}
          />
        }
      >
        <Space height={10} />

        {wishlist?.length > 0 ? (
          wishlist?.map((item) => <TutorCard key={item._id} data={item} />)
        ) : (
          <View style={{ alignItems: "center" }}>
            <Space height={200} />
            <Icon icon={sadIcon} xxl />
            <Space height={20} />

            <Text
              style={{
                color: Color.dark1,
                fontSize: 16,
                fontFamily: "sofia-medium",
                lineHeight: 26,
                marginRight: 5,
              }}
            >
              You haven't added anyone yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
