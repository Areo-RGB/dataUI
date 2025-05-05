# Project Handover Document: Video Analysis Platform

## Project Overview

This document summarizes the work done on a sports video analysis platform that allows coaches and athletes to view, compare, and analyze performance videos. The system includes features for video selection, playback, annotation, and performance data visualization.

## Key Problems Addressed & Solutions

### 1. Component Cohesion and Separation of Concerns

**Problem:** The original `app/videos/page.tsx` component was handling too many responsibilities, including state management, UI rendering, and data fetching.

**Solution:** 
- Created a custom `useVideoSelection` hook to manage video selection logic
- Extracted UI controls into a separate `VideoSelectionControls` component
- Refactored the main page component to use these new components

### 2. Video Selection and Filtering

**Problem:** The application needed a way to select videos by athlete, test type, and date.

**Solution:**
- Implemented a custom hook (`useVideoSelection`) that manages:
  - Available athletes, test types, and dates
  - Selected athlete, test type, and date
  - Loading states
  - Video and performance data fetching

### 3. Thumbnail Generation

**Problem:** The application needed a way to generate thumbnails for videos.

**Solution:**
- Recommended a server-side approach with a utility function in `lib/video-utils.ts`
- Created an API route at `app/api/thumbnail/route.ts` to handle thumbnail generation
- Provided an alternative client-side approach with a `VideoThumbnail` component

## Component Architecture

The application follows a clean architecture with separation of concerns:

\`\`\`
app/
├── videos/
│   └── page.tsx           # Main videos page (uses hooks and components)
components/
├── videos/
│   ├── video-player.tsx             # Video playback component
│   ├── video-annotation.tsx         # Video annotation component
│   ├── video-selection-controls.tsx # UI controls for video selection
│   ├── performance-overlay.tsx      # Performance data visualization
│   └── enhanced-video-comparison.tsx # Side-by-side video comparison
hooks/
├── use-video-selection.ts  # Custom hook for video selection logic
lib/
├── data.ts                 # Data fetching and manipulation
├── annotations.ts          # Annotation-related utilities
└── video-utils.ts          # Video utility functions (including thumbnail generation)
\`\`\`

## How to Use Key Components

### 1. Video Selection Hook and Controls

\`\`\`tsx
// In your page component
import { useVideoSelection } from "@/hooks/use-video-selection";
import VideoSelectionControls from "@/components/videos/video-selection-controls";

export default function YourPage() {
  const {
    selectedAthlete,
    setSelectedAthlete,
    selectedTestType,
    setSelectedTestType,
    selectedDate,
    setSelectedDate,
    allAthletes,
    testTypesForAthlete,
    availableDates,
    athleteVideo,
    athleteData,
    isLoading,
  } = useVideoSelection();

  return (
    <div>
      <VideoSelectionControls
        allAthletes={allAthletes}
        selectedAthlete={selectedAthlete}
        onAthleteChange={setSelectedAthlete}
        testTypesForAthlete={testTypesForAthlete}
        selectedTestType={selectedTestType}
        onTestTypeChange={setSelectedTestType}
        availableDates={availableDates}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        isLoading={isLoading}
      />
      
      {/* Use athleteVideo and athleteData to display content */}
    </div>
  );
}
\`\`\`

### 2. Video Player

\`\`\`tsx
import VideoPlayer from "@/components/videos/video-player";

// Basic usage
<VideoPlayer
  src={videoUrl}
  title="Video Title"
/>

// With all options
<VideoPlayer
  src={videoUrl}
  title="Video Title"
  poster="/path/to/poster.jpg"
  className="custom-class"
  autoPlay={false}
/>
\`\`\`

### 3. Video Comparison

\`\`\`tsx
import EnhancedVideoComparison from "@/components/videos/enhanced-video-comparison";

<EnhancedVideoComparison
  leftVideo={{
    src: leftVideoUrl,
    title: "Left Video Title",
  }}
  rightVideo={{
    src: rightVideoUrl,
    title: "Right Video Title",
  }}
  leftPerformanceData={leftAthleteData}
  rightPerformanceData={rightAthleteData}
  initialSyncState={true}
/>
\`\`\`

### 4. Thumbnail Generation

\`\`\`tsx
// Server-side approach (recommended)
import { generateThumbnailUrl } from '@/lib/video-utils';

const thumbnailUrl = generateThumbnailUrl(videoUrl);
<img src={thumbnailUrl || "/placeholder.svg"} alt="Video thumbnail" />

// Client-side approach (alternative)
import VideoThumbnail from '@/components/videos/video-thumbnail';

<VideoThumbnail
  videoUrl={videoUrl}
  time={5} // Capture frame at 5 seconds
  width={320}
  height={180}
/>
\`\`\`

## Implementation Details

### Data Structure

The application uses several key data structures:

1. **VideoData**:
\`\`\`typescript
interface VideoData {
  url: string;
  name: string;
  test: string;
  result: number | string;
  date?: string;
  description?: string;
}
\`\`\`

2. **PerformanceData**:
\`\`\`typescript
interface PerformanceData {
  kategorie: string;
  uebung: string;
  name: string;
  ergebnis: number | string;
}
\`\`\`

3. **Annotation**:
\`\`\`typescript
interface Annotation {
  tool: "pencil" | "circle" | "arrow" | "text";
  color: string;
  points: { x: number; y: number }[];
  timestamp: number;
  text?: string;
}
\`\`\`

### Key Functions

The application includes several utility functions in `lib/data.ts`:

- `getAvailableAthletes()`: Returns all athletes with videos
- `getTestTypesForAthlete(athleteName)`: Returns test types for a specific athlete
- `getDatesForAthleteAndTest(athleteName, testType)`: Returns dates for a specific athlete and test
- `getVideoByAthleteTestAndDate(athleteName, testType, date)`: Returns a video for specific criteria
- `getExerciseData(exercise)`: Returns performance data for a specific exercise

## Video Annotation System

The platform includes a comprehensive annotation system that allows coaches to add visual annotations to videos:

### Annotation Types

1. **Pencil**: Freehand drawing on the video
2. **Circle**: Draw circles to highlight areas
3. **Arrow**: Draw arrows to indicate movement or direction
4. **Text**: Add text annotations at specific positions

### Annotation Storage

Annotations are stored with the following metadata:
- Video URL they belong to
- Timestamp in the video
- Position and styling information
- Tool type and properties

### Using the Annotation Component

\`\`\`tsx
import VideoAnnotation from "@/components/videos/video-annotation";

// Inside your component with a video reference
const videoRef = useRef<HTMLVideoElement>(null);
const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

// When video loads, set dimensions
useEffect(() => {
  if (videoRef.current) {
    setVideoDimensions({
      width: videoRef.current.clientWidth,
      height: videoRef.current.clientHeight
    });
  }
}, []);

// Render annotation component
<VideoAnnotation
  videoRef={videoRef}
  width={videoDimensions.width}
  height={videoDimensions.height}
  onSave={(annotations) => {
    // Handle saving annotations
    console.log('Saved annotations:', annotations);
  }}
/>
\`\`\`

## Performance Overlay Component

The `PerformanceOverlay` component displays performance metrics on top of videos:

\`\`\`tsx
import PerformanceOverlay from "@/components/videos/performance-overlay";

<PerformanceOverlay
  videoRef={videoRef}
  width={videoDimensions.width}
  height={videoDimensions.height}
  performanceData={athleteData}
  comparisonData={benchmarkData}
  showComparison={true}
/>
\`\`\`

### Performance Data Visualization

The overlay can display:
- Individual athlete metrics
- Comparison with benchmarks (DFB standards)
- Direct comparison between two athletes
- Percentage differences and improvement indicators

## Data Flow and State Management

### State Management Approach

The application uses React's built-in state management with custom hooks:

1. **Local Component State**: For UI-specific state
2. **Custom Hooks**: For shared logic and derived state
3. **Prop Drilling**: For passing data down the component tree

### Data Flow Diagram

\`\`\`
useVideoSelection Hook
│
├── State Management
│   ├── selectedAthlete, setSelectedAthlete
│   ├── selectedTestType, setSelectedTestType
│   ├── selectedDate, setSelectedDate
│   └── isLoading
│
├── Data Fetching (from lib/data.ts)
│   ├── allAthletes = getAvailableAthletes()
│   ├── testTypesForAthlete = getTestTypesForAthlete(selectedAthlete)
│   ├── availableDates = getDatesForAthleteAndTest(...)
│   ├── athleteVideo = getVideoByAthleteTestAndDate(...)
│   └── athleteData = getExerciseData(selectedTestType)
│
└── Derived Data
    ├── annotationCount
    └── Other computed properties
\`\`\`

## Testing Considerations

### Component Testing

For testing components, consider:

1. **Unit Tests**: Test individual components with mocked data
2. **Integration Tests**: Test component interactions
3. **Visual Regression Tests**: Ensure UI consistency

Example test for `VideoSelectionControls`:

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import VideoSelectionControls from '@/components/videos/video-selection-controls';

describe('VideoSelectionControls', () => {
  it('renders all selection dropdowns', () => {
    render(
      <VideoSelectionControls
        allAthletes={['Athlete1', 'Athlete2']}
        selectedAthlete="Athlete1"
        onAthleteChange={() => {}}
        testTypesForAthlete={['Test1', 'Test2']}
        selectedTestType="Test1"
        onTestTypeChange={() => {}}
        availableDates={['2023-01-01', '2023-01-02']}
        selectedDate="2023-01-01"
        onDateChange={() => {}}
      />
    );
    
    expect(screen.getByLabelText(/select athlete/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select test type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
  });
  
  it('calls onAthleteChange when athlete selection changes', () => {
    const mockOnChange = jest.fn();
    render(
      <VideoSelectionControls
        allAthletes={['Athlete1', 'Athlete2']}
        selectedAthlete="Athlete1"
        onAthleteChange={mockOnChange}
        testTypesForAthlete={['Test1', 'Test2']}
        selectedTestType="Test1"
        onTestTypeChange={() => {}}
        availableDates={['2023-01-01', '2023-01-02']}
        selectedDate="2023-01-01"
        onDateChange={() => {}}
      />
    );
    
    fireEvent.change(screen.getByLabelText(/select athlete/i), { target: { value: 'Athlete2' } });
    expect(mockOnChange).toHaveBeenCalledWith('Athlete2');
  });
});
\`\`\`

### Hook Testing

For testing the `useVideoSelection` hook:

\`\`\`tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useVideoSelection } from '@/hooks/use-video-selection';

// Mock the data functions
jest.mock('@/lib/data', () => ({
  getAvailableAthletes: () => ['Athlete1', 'Athlete2'],
  getTestTypesForAthlete: () => ['Test1', 'Test2'],
  // ... other mocks
}));

describe('useVideoSelection', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useVideoSelection());
    
    expect(result.current.selectedAthlete).toBe('Athlete1');
    expect(result.current.allAthletes).toEqual(['Athlete1', 'Athlete2']);
  });
  
  it('updates selected athlete', () => {
    const { result } = renderHook(() => useVideoSelection());
    
    act(() => {
      result.current.setSelectedAthlete('Athlete2');
    });
    
    expect(result.current.selectedAthlete).toBe('Athlete2');
  });
});
\`\`\`

## Deployment Considerations

### Environment Variables

The application may require these environment variables:

\`\`\`
VIDEO_STORAGE_URL=https://your-storage-url.com
API_KEY=your-api-key
NEXT_PUBLIC_APP_URL=https://your-app-url.com
\`\`\`

### Build Optimization

For optimal performance:

1. **Static Generation**: Use Next.js static generation for pages where possible
2. **Image Optimization**: Use Next.js Image component for thumbnails
3. **Code Splitting**: Ensure proper code splitting for large components
4. **Caching Strategy**: Implement caching for video metadata and thumbnails

## Advanced Component Interactions

### Video Player with Annotations and Performance Overlay

\`\`\`tsx
import { useState, useRef, useEffect } from 'react';
import VideoPlayer from '@/components/videos/video-player';
import VideoAnnotation from '@/components/videos/video-annotation';
import PerformanceOverlay from '@/components/videos/performance-overlay';

export default function AdvancedVideoAnalysis({ videoUrl, performanceData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (videoRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: videoRef.current!.clientWidth,
          height: videoRef.current!.clientHeight
        });
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);
  
  return (
    <div className="relative">
      <VideoPlayer
        ref={videoRef}
        src={videoUrl}
        title="Advanced Analysis"
      />
      
      {showAnnotations && dimensions.width > 0 && (
        <VideoAnnotation
          videoRef={videoRef}
          width={dimensions.width}
          height={dimensions.height}
          onSave={handleSaveAnnotations}
        />
      )}
      
      {showPerformance && (
        <PerformanceOverlay
          videoRef={videoRef}
          width={dimensions.width}
          height={dimensions.height}
          performanceData={performanceData}
        />
      )}
      
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button onClick={() => setShowAnnotations(!showAnnotations)}>
          {showAnnotations ? 'Hide' : 'Show'} Annotations
        </button>
        <button onClick={() => setShowPerformance(!showPerformance)}>
          {showPerformance ? 'Hide' : 'Show'} Performance
        </button>
      </div>
    </div>
  );
}
\`\`\`

## Performance Optimization Techniques

### Video Loading Optimization

1. **Lazy Loading**: Only load videos when they come into view
2. **Preloading**: Preload the next video in a sequence
3. **Adaptive Streaming**: Use HLS or DASH for adaptive bitrate streaming

Example of lazy loading videos:

\`\`\`tsx
import { useInView } from 'react-intersection-observer';

function LazyVideoPlayer({ src, ...props }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <div ref={ref} className="video-container">
      {inView ? (
        <VideoPlayer src={src} {...props} />
      ) : (
        <div className="video-placeholder">
          <span>Loading video...</span>
        </div>
      )}
    </div>
  );
}
\`\`\`

### Thumbnail Generation Optimization

For the server-side thumbnail generation approach:

1. **Caching**: Cache thumbnails with a CDN
2. **Resizing**: Generate multiple sizes for different devices
3. **Format Selection**: Use WebP for modern browsers

## Troubleshooting Common Issues

### Video Playback Issues

1. **CORS Errors**: Ensure video sources allow cross-origin requests
2. **Format Compatibility**: Use WebM or MP4 for broad browser support
3. **Playback Controls**: Check if video controls are properly initialized

### Annotation Issues

1. **Canvas Sizing**: Ensure canvas dimensions match video dimensions
2. **Coordinate Mapping**: Verify coordinate mapping between video and canvas
3. **Event Handling**: Check for proper mouse event handling

### Performance Data Issues

1. **Data Matching**: Ensure performance data matches the selected athlete and test
2. **Calculation Errors**: Verify percentage difference calculations
3. **Display Formatting**: Check number formatting and units

## Future Considerations

1. **Thumbnail Caching**: Implement caching for server-generated thumbnails to improve performance.

2. **Real-time Annotations**: Consider implementing real-time collaborative annotations.

3. **Performance Optimizations**:
   - Lazy load videos and components
   - Implement virtualization for large lists
   - Consider using Next.js Image component for optimized image loading

4. **Enhanced Analytics**:
   - Add more detailed performance metrics
   - Implement trend analysis over time
   - Add comparison visualizations

5. **Mobile Responsiveness**:
   - Ensure all components work well on mobile devices
   - Consider a dedicated mobile layout for video playback

## Code Quality Guidelines

The project follows these code quality guidelines:

1. **Component Cohesion**: Each component should have a single responsibility.
2. **Custom Hooks**: Extract complex logic into custom hooks.
3. **Type Safety**: Use TypeScript interfaces for all data structures.
4. **Error Handling**: Implement proper error states and loading indicators.
5. **Accessibility**: Ensure all components are accessible.

## Conclusion

This video analysis platform provides a comprehensive solution for sports performance analysis. The modular architecture allows for easy extension and maintenance, while the separation of concerns ensures code clarity and testability.

By following the patterns established in this codebase, new features can be added with minimal disruption to existing functionality. The custom hooks approach provides a clean way to manage state and derived data, while the component-based UI allows for flexible and responsive layouts.
