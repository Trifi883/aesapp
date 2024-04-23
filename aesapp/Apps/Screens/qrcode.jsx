import React from 'react';
import { View, StyleSheet } from 'react-native';

const QrCodeBorder = () => {
  return (
    <View style={styles.qrCodeBorder}>
      {/* Votre contenu ici */}
    </View>
  );
};

const styles = StyleSheet.create({
  qrCodeBorder: {
    position: 'relative',
    width: 300, // Ajuster la largeur selon vos besoins
    height: 300, // Ajuster la hauteur selon vos besoins
    borderRadius: 10, // Rayon d'angle arrondi
    overflow: 'hidden', // Masquer le contenu débordant

    /* Coins */
    borderTopLeftRadius: 20, // Rayon d'angle supérieur gauche
    borderTopRightRadius: 20, // Rayon d'angle supérieur droit
    borderBottomLeftRadius: 20, // Rayon d'angle inférieur gauche
    borderBottomRightRadius: 20, // Rayon d'angle inférieur droit
  },
});

export default QrCodeBorder;
