import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { filtersData } from "@/constants/filters-data";
import { Colors } from "@/constants/colors";

type FilterItem = {
  value: string;
  label: string;
};

type RenderItemProps = {
  item: FilterItem;
};

const HorizontalFilter = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");
  const renderItem = ({ item }: RenderItemProps) => {
    const handleFilterPress = () => {
      setSelectedFilter(item.value);
    };
    return (
      <Pressable
        style={[
          styles.filterButton,
          item.value === selectedFilter && styles.selectedFilterButton,
        ]}
        onPress={handleFilterPress}
      >
        <Text
          style={[
            styles.filterText,
            item.value === selectedFilter && styles.selectedFilterButton,
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={filtersData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
    />
  );
};

export default HorizontalFilter;

const styles = StyleSheet.create({
  filtersContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    fontSize: 16,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  selectedFilterButton: {
    backgroundColor: Colors.secondaryBG,
    color: Colors.primaryBG,
  },
});
