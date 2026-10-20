package com.culinaryverse.ai.data.model

data class TableStylingConcept(
    val id: String,
    val slug: String,
    val title: String,
    val titleMalayalam: String,
    val collection: String,
    val occasion: String? = null,
    val tagline: String,
    val description: String,
    val descriptionMalayalam: String,
    val theme: String,
    val recommendedGuestCount: GuestRange,
    val tableShape: String,
    val colorPalette: TableColorPalette,
    val servingStyle: String,
    val moodBoardImageUrl: String,
    val tableclothRunner: String,
    val plateAndCutleryArrangement: String,
    val centerpieceAndFlorals: String,
    val napkinFoldingGuide: NapkinGuide,
    val lightingAndCandles: String,
    val foodPresentationTips: List<String> = emptyList(),
    val estimatedBudgetINR: BudgetRange,
    val culturalContext: String
)

data class GuestRange(
    val min: Int,
    val max: Int
)

data class BudgetRange(
    val min: Int,
    val max: Int
)

data class TableColorPalette(
    val primary: String,
    val secondary: String,
    val accent: String,
    val neutral: String
)

data class NapkinGuide(
    val name: String,
    val steps: List<String> = emptyList(),
    val stepsMalayalam: List<String> = emptyList()
)

data class TableStylingResponse(
    val total: Int,
    val concepts: List<TableStylingConcept>
)
