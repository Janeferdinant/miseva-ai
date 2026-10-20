import { NextRequest, NextResponse } from "next/server";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { generateThemePrompt, PresentationPromptOptions } from "@/lib/table-styling/image-prompt-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { themeId, options } = body;

    const theme = LUXURY_TABLE_THEMES.find((t) => t.id === themeId || t.slug === themeId);
    if (!theme) {
      return NextResponse.json(
        { error: `Theme not found: ${themeId}` },
        { status: 404 }
      );
    }

    const promptOptions: PresentationPromptOptions = {
      selectedDishes: options?.selectedDishes || [],
      guestCount: options?.guestCount || 6,
      tableShape: options?.tableShape || "rectangular",
      occasion: options?.occasion || "Celebration Dining",
      cutleryOverride: options?.cutleryOverride,
      plateOverride: options?.plateOverride,
      glasswareOverride: options?.glasswareOverride,
      linensOverride: options?.linensOverride,
      aspectRatio: options?.aspectRatio || "16:9"
    };

    const rendered = generateThemePrompt(theme, promptOptions);

    return NextResponse.json({
      success: true,
      theme: {
        id: theme.id,
        title: theme.title,
        titleMalayalam: theme.titleMalayalam,
        catchphrase: theme.catchphrase,
        description: theme.description,
        colorPalette: theme.colorPalette,
        moodBoardImageUrl: theme.moodBoardImageUrl
      },
      rendered
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to render dining presentation", details: error.message },
      { status: 500 }
    );
  }
}
