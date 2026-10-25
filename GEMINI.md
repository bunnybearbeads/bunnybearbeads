# Modern CSS Guidelines

Write modern CSS standards across the project:

1. **Color syntax**:
   - Use space-separated CSS Color Module Level 4 syntax: `rgb(r g b / a)` and `hsl(h s% l% / a)` instead of comma-separated legacy `rgba(...)` or `hsla(...)`.
   - Examples: `rgb(42 123 136 / 15%)`, `rgb(0 0 0 / 6%)`.

2. **Opacity & percentages**:
   - Use percentage values: `opacity: 80%` instead of `opacity: 0.8`.

3. **Media queries (Range Syntax)**:
   - Use modern comparison operators for viewport ranges:
     - `@media (1600px <= width)` instead of `@media (min-width: 1600px)`
     - `@media (width < 740px)` instead of `@media (max-width: 739px)`
     - `@media (740px <= width < 1200px)` for bounded intervals.

4. **Transforms & layout**:
   - Prefer modern CSS features (e.g. individual transform properties `translate`, `rotate`, `scale` where appropriate, subgrid, logical properties).
