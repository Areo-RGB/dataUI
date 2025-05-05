# Video Integration Workflow

This document outlines the process for adding new videos to the system, including how to add the necessary data and annotations.

## 1. Required Video Information

Before adding a new video, gather the following information:

| Field | Description | Example |
|-------|-------------|---------|
| URL | The URL where the video is hosted | `https://data3.fra1.cdn.digitaloceanspaces.com/new-video.webm` |
| Athlete Name | The name of the athlete in the video | `Finley` |
| Test Type | The type of test being performed | `10m Sprint` |
| Result | The numerical result of the test | `2.05` |
| Date | The recording date (DD-MM-YYYY format) | `20-05-2023` |
| Description | A brief description of the video content | `Analysis of sprint technique with focus on initial acceleration` |

## 2. Adding the Video to the Data File

Add the video information to the `videoData` array in `lib/data.ts`:

\`\`\`typescript
// Add to the videoData array in lib/data.ts
{
  url: "https://data3.fra1.cdn.digitaloceanspaces.com/new-video.webm",
  name: "Finley",
  test: "10m Sprint",
  result: 2.05,
  date: "20-05-2023",
  description: "Analysis of sprint technique with focus on initial acceleration",
}
\`\`\`

## 3. Adding Performance Data (if applicable)

If this is a new test result for an athlete, add the performance data to the `performanceData` array in `lib/data.ts`:

\`\`\`typescript
// Add to the performanceData array in lib/data.ts
{
  kategorie: "Schnelligkeit", 
  uebung: "10m Sprint", 
  name: "Finley", 
  ergebnis: 2.05
}
\`\`\`

## 4. Adding Annotations

To add annotations for the video, update the `sampleAnnotations` array in `lib/annotations.ts`:

\`\`\`typescript
// Add to the sampleAnnotations array in lib/annotations.ts
{
  id: "annotation-new-1",
  videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/new-video.webm",
  text: "Good starting position",
  startTime: 1.5,
  duration: 3.0,
  position: "bottom-left",
  style: {
    color: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    fontSize: 16,
    fontWeight: "bold"
  }
}
\`\`\`

### Annotation Properties

| Property | Description | Example |
|----------|-------------|---------|
| id | Unique identifier for the annotation | `"annotation-new-1"` |
| videoUrl | URL of the video this annotation belongs to | `"https://data3.fra1.cdn.digitaloceanspaces.com/new-video.webm"` |
| text | The text content to display | `"Good starting position"` |
| startTime | When to start showing the annotation (in seconds) | `1.5` |
| duration | How long to show the annotation (in seconds) | `3.0` |
| position | Predefined position on the video | `"bottom-left"` |
| style | Optional styling for the annotation | See example above |

### Available Positions

The following positions are available for annotations:

- `"top-left"`
- `"top-center"`
- `"top-right"`
- `"middle-left"`
- `"middle-center"`
- `"middle-right"`
- `"bottom-left"`
- `"bottom-center"`
- `"bottom-right"`

### Style Properties

| Property | Description | Example |
|----------|-------------|---------|
| color | Text color (CSS color value) | `"#ffffff"` |
| backgroundColor | Background color with opacity (CSS color value) | `"rgba(0, 0, 0, 0.7)"` |
| fontSize | Font size in pixels | `16` |
| fontWeight | Font weight (normal, bold, etc.) | `"bold"` |

## 5. Testing the Integration

After adding the video and annotations:

1. Navigate to the Videos page
2. Select the athlete and test type for your new video
3. Verify that the video plays correctly
4. Check that annotations appear at the specified times
5. Verify that the performance data is displayed correctly

## 6. Troubleshooting

If annotations don't appear:

1. Check that the `videoUrl` in the annotation exactly matches the `url` in the video data
2. Verify that the `startTime` and `duration` values are correct
3. Check the browser console for any errors

If the video doesn't appear in the selection:

1. Verify that the athlete name and test type are correctly added to the `videoData` array
2. Check that the athlete name matches exactly with other entries for the same athlete
3. Ensure the test type is one of the predefined types used elsewhere in the system
