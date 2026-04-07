# Mobile Scene QA Checkpoints (Pre-Merge)

## Purpose
Guard the workspace experience so mobile readability and emotional legibility are validated before any merge.

## Scene-Level Mobile-First Constraints
Apply these checks to each scene (`Thread`, `Field`, `Guide`) at iPhone viewport sizes.

1. **Tighter top copy**
   - Header copy stays within two short lines.
   - Intro copy avoids clause stacking and keeps one action verb per sentence.
2. **Cleaner line breaks**
   - No dense paragraph blocks above the first interaction.
   - Primary explanatory text maintains comfortable scan rhythm (roughly 45–75 characters per line on iPhone width).
3. **One dominant idea per viewport**
   - The first visible card/message on each scene communicates one core intent only:
     - Thread: name the moment.
     - Field: read the pattern.
     - Guide: choose one support view.
4. **Thumb-friendly controls**
   - Primary nav and action controls keep minimum 44px touch height.
   - Adjacent interactive targets preserve enough spacing to avoid accidental taps.

## Desktop Expansion Rule
Desktop may only expand atmosphere and spacing. It must **not**:
- alter information order,
- introduce new required concepts,
- add complexity that changes the mobile decision flow.

Allowed desktop differences:
- increased negative space,
- asymmetrical composition,
- richer visual atmosphere.

## Required QA Checkpoint Passes (Before Merge)
Run and record these checks on an iPhone-sized viewport (e.g., 390×844):

- [ ] **Readability checkpoint**: All scene headers and top explanatory text are understandable at a glance without zooming.
- [ ] **Emotional legibility checkpoint**: The user can identify the emotional intent of each scene in under 3 seconds (name moment / read pattern / choose guide).
- [ ] **Touch checkpoint**: Bottom tabs and primary actions are comfortably tappable with one thumb.
- [ ] **Order integrity checkpoint**: Desktop presents the same information order as mobile.
