import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import RegularText from '../RegularText';

const CommonTextInput = ({
  placeHolder,
  onChangeText = () => { },
  onSubmitEditing = () => { },
  value,
  error = "",
  label,
  placeholderTextColor,
  activeOutlineColor,
  autoCapitalize,
  inactiveOutlineColor,
  keyboardType,
  maxChar,
  disable,
  secureTextEntry
}) => {
  return (
    <View style={styles.mainView} >
      <TextInput
        label={label}
        value={value || ''}
        mode="outlined"
        autoCapitalize={autoCapitalize}
        onChangeText={text => onChangeText(text)}
        onSubmitEditing={() => onSubmitEditing()}
        style={styles.textInputStyle}
        outlineColor={inactiveOutlineColor || colors.grey300}
        activeOutlineColor={activeOutlineColor || colors.theme}
        textColor={colors.black}
        editable={disable}
        error={error != ''}
        placeholderTextColor={placeholderTextColor || colors.grey500}
        placeholder={placeHolder || ''}
        // error
        secureTextEntry={secureTextEntry}
        outlineStyle={{ borderRadius: spacing.RADIUS_8 }}
        keyboardType={keyboardType}
        maxLength={maxChar}
      />
      <RegularText style={styles.errorStyle} >{error || ''}</RegularText>

    </View>

  );
};

const styles = StyleSheet.create({
  mainView: {
  },
  textInputStyle: {
    fontFamily: fontNames.OPEN_SANS_MEDIUM,
    fontSize: textScale(12),
    backgroundColor: colors.white,
  },
  errorStyle: {
    fontSize: textScale(10),
    color: colors.red900,
    // marginTop: spacing.MARGIN_4,
  },
});

export default CommonTextInput;
