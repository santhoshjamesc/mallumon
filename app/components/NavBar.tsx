import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, shadows, spacing } from '../theme/theme';

interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

function NavItem({ icon, label, isActive = false, onPress }: NavItemProps) {
  return (
    <TouchableOpacity
      style={[styles.navItem, isActive && styles.navItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
      {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );
}

interface NavBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function NavBar({ activeTab = 'home', onTabChange }: NavBarProps) {
  const handleTabPress = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <View style={styles.navBar}>
      <NavItem
        icon="🏠"
        label="Home"
        isActive={activeTab === 'home'}
        onPress={() => handleTabPress('home')}
      />
      <NavItem
        icon="🎯"
        label="Hunt"
        isActive={activeTab === 'hunt'}
        onPress={() => handleTabPress('hunt')}
      />
      <NavItem
        icon="📚"
        label="Collection"
        isActive={activeTab === 'collection'}
        onPress={() => handleTabPress('collection')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 217, 255, 0.2)',
    backgroundColor: colors.background.primary,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  navItemActive: {
    // Active state handled by children
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.card,
    marginBottom: spacing.xs,
  },
  iconContainerActive: {
    backgroundColor: colors.accent.cyan,
    ...shadows.glow.cyan,
  },
  icon: {
    fontSize: 22,
  },
  label: {
    color: colors.text.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.accent.cyan,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent.cyan,
  },
});
