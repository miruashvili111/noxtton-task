import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ScrollViewProps {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}