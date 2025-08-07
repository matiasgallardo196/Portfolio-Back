# Theme System Documentation

## Overview

The theme system has been centralized within the `portfolioData` structure, allowing all visual configurations to be managed from a single source. This enables easy customization of colors, fonts, animations, spacing, and other visual properties without modifying individual components.

## Structure

### Theme Data Location

- **File**: `data/theme.ts`
- **Access**: `portfolioData.theme`
- **Type**: `ThemeData`

### Main Theme Sections

#### 1. Colors (`ThemeColors`)

```typescript
colors: {
  primary: { 50: "#eff6ff", 100: "#dbeafe", ... },
  secondary: { 50: "#f8fafc", 100: "#f1f5f9", ... },
  accent: { 50: "#fdf4ff", 100: "#fae8ff", ... },
  gray: { 50: "#f9fafb", 100: "#f3f4f6", ... },
  yellow: { 400: "#fbbf24", 500: "#f59e0b" },
  blue: { 400: "#60a5fa", 500: "#3b82f6" },
  purple: { 300: "#c4b5fd", 600: "#7c3aed" }
}
```

#### 2. Fonts (`ThemeFonts`)

```typescript
fonts: {
  sans: ["Inter", "system-ui", "sans-serif"],
  display: ["Poppins", "system-ui", "sans-serif"],
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  }
}
```

#### 3. Animations (`ThemeAnimations`)

```typescript
animations: {
  fadeIn: { duration: "0.5s", easing: "ease-in-out", keyframes: {...} },
  slideUp: { duration: "0.5s", easing: "ease-out", keyframes: {...} },
  float: { duration: "6s", easing: "ease-in-out", keyframes: {...} },
  pulse: { duration: "3s", easing: "cubic-bezier(0.4, 0, 0.6, 1)" }
}
```

#### 4. Spacing (`ThemeSpacing`)

```typescript
spacing: {
  container: { maxWidth: "80rem", padding: {...} },
  navbar: { height: "5rem", padding: "1rem" },
  section: { padding: "4rem 0", margin: "2rem 0" },
  card: { padding: "1.5rem", borderRadius: "1rem" },
  button: { padding: "0.75rem 1.5rem", borderRadius: "0.75rem" }
}
```

#### 5. Shadows (`ThemeShadows`)

```typescript
shadows: {
  glow: "0 0 20px rgba(59, 130, 246, 0.3)",
  glowLg: "0 0 40px rgba(59, 130, 246, 0.4)",
  card: "0 10px 15px -3px rgba(0, 0, 0, 0.1)...",
  cardHover: "0 20px 25px -5px rgba(0, 0, 0, 0.1)...",
  button: "0 4px 6px -1px rgba(0, 0, 0, 0.1)..."
}
```

#### 6. Gradients (`ThemeGradients`)

```typescript
gradients: {
  primary: "linear-gradient(to right, #2563eb, #c026d3)",
  accent: "linear-gradient(to right, #c026d3, #2563eb)",
  background: { light: "...", dark: "..." },
  text: { light: "...", dark: "..." },
  button: { primary: "...", secondary: "..." }
}
```

#### 7. Other Properties

- **Border Radius**: `sm`, `md`, `lg`, `xl`, `2xl`
- **Backdrop Blur**: `sm`, `md`, `lg`
- **Transitions**: `fast`, `normal`, `slow`
- **Z-Index**: `navbar`, `modal`, `tooltip`
- **Breakpoints**: `sm`, `md`, `lg`, `xl`, `2xl`

## Usage Examples

### In Components

```typescript
import { portfolioData } from "../data";

const MyComponent = () => {
  const { theme } = portfolioData;

  return (
    <div
      style={{
        backgroundColor: theme.colors.primary[500],
        borderRadius: theme.borderRadius.lg,
        transition: theme.transitions.normal,
        boxShadow: theme.shadows.card,
      }}
    >
      Content
    </div>
  );
};
```

### Dynamic Styling

```typescript
const Button = ({ variant = "primary" }) => {
  const { theme } = portfolioData;

  const buttonStyles = {
    primary: {
      background: theme.gradients.button.primary,
      color: "white",
    },
    secondary: {
      background: theme.gradients.button.secondary,
      color: theme.colors.gray[800],
    },
  };

  return (
    <button
      style={{
        ...buttonStyles[variant],
        padding: theme.spacing.button.padding,
        borderRadius: theme.spacing.button.borderRadius,
        transition: theme.transitions.normal,
      }}
    >
      Click me
    </button>
  );
};
```

### CSS Custom Properties

The theme system also sets CSS custom properties in `_app.tsx`:

```css
:root {
  --transition-normal: 300ms ease-in-out;
  --border-radius-lg: 0.75rem;
  --z-index-navbar: 50;
}
```

## Customization

### Changing Colors

To change the primary color scheme:

```typescript
// In data/theme.ts
export const themeData: ThemeData = {
  colors: {
    primary: {
      50: "#f0f9ff", // New blue shade
      100: "#e0f2fe",
      // ... update all shades
      900: "#0c4a6e",
    },
    // ... rest of colors
  },
  // ... rest of theme
};
```

### Adding New Animations

```typescript
animations: {
  // ... existing animations
  bounce: {
    duration: "1s",
    easing: "ease-in-out",
    keyframes: {
      "0%, 20%, 53%, 80%, 100%": { transform: "translate3d(0,0,0)" },
      "40%, 43%": { transform: "translate3d(0,-30px,0)" },
      "70%": { transform: "translate3d(0,-15px,0)" },
      "90%": { transform: "translate3d(0,-4px,0)" },
    },
  },
}
```

### Modifying Spacing

```typescript
spacing: {
  container: {
    maxWidth: "90rem",  // Increased from 80rem
    padding: {
      mobile: "1.5rem", // Increased from 1rem
      tablet: "2rem",   // Increased from 1.5rem
      desktop: "2.5rem", // Increased from 2rem
    },
  },
  // ... rest of spacing
}
```

## Benefits

1. **Centralized Management**: All visual properties in one place
2. **Type Safety**: Full TypeScript support with interfaces
3. **Easy Customization**: Change theme without touching components
4. **Consistency**: Ensures visual consistency across the application
5. **Maintainability**: Easier to maintain and update visual styles
6. **Scalability**: Easy to add new theme properties

## Migration from Hardcoded Values

The following components have been updated to use the centralized theme:

- ✅ `ThemeToggle.tsx` - Uses theme colors, transitions, and border radius
- ✅ `Navbar.tsx` - Uses theme spacing, z-index, and backdrop blur
- ✅ `_app.tsx` - Applies theme CSS custom properties

## Future Enhancements

1. **Theme Variants**: Support for multiple theme variants (e.g., corporate, creative)
2. **Dynamic Theme Switching**: Runtime theme switching without page reload
3. **Theme Presets**: Pre-built theme configurations
4. **CSS-in-JS Integration**: Better integration with styled-components or emotion
5. **Design Token Export**: Export theme as design tokens for design systems

## Best Practices

1. **Always use theme values** instead of hardcoded colors or spacing
2. **Extend the theme interface** when adding new visual properties
3. **Use semantic naming** for color variations (e.g., `primary`, `secondary`, `accent`)
4. **Test theme changes** across all components
5. **Document new theme properties** in this file
6. **Use CSS custom properties** for frequently accessed values

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all theme properties are properly typed
2. **Missing Properties**: Check if the property exists in the theme interface
3. **Performance**: Avoid accessing theme in render loops
4. **CSS Conflicts**: Ensure CSS custom properties don't conflict with existing styles

### Debugging

```typescript
// Log theme data for debugging
console.log("Theme data:", portfolioData.theme);

// Check specific property
console.log("Primary color:", portfolioData.theme.colors.primary[500]);
```
