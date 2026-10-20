package com.culinaryverse.ai.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import com.culinaryverse.ai.theme.CulinaryThemeName
import com.culinaryverse.ai.ui.screens.beverages.BeveragesScreen
import com.culinaryverse.ai.ui.screens.cooking.CookingStudioScreen
import com.culinaryverse.ai.ui.screens.desserts.DessertsScreen
import com.culinaryverse.ai.ui.screens.home.HomeScreen
import com.culinaryverse.ai.ui.screens.profile.ProfileScreen
import com.culinaryverse.ai.ui.screens.recipe.RecipeDetailScreen
import com.culinaryverse.ai.ui.screens.shopping.ShoppingScreen
import com.culinaryverse.ai.ui.screens.tablestyling.TableStylingScreen

@Composable
fun CulinaryNavGraph(
    navController: NavHostController,
    currentTheme: CulinaryThemeName,
    onThemeSelected: (CulinaryThemeName) -> Unit
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val bottomNavItems = listOf(
        Screen.Home to Icons.Default.Home,
        Screen.Desserts to Icons.Default.Cake,
        Screen.Beverages to Icons.Default.LocalBar,
        Screen.TableStyling to Icons.Default.Restaurant,
        Screen.Shopping to Icons.Default.ShoppingCart,
        Screen.Profile to Icons.Default.Person
    )

    val showBottomBar = currentRoute in listOf(
        Screen.Home.route,
        Screen.Desserts.route,
        Screen.Beverages.route,
        Screen.TableStyling.route,
        Screen.Shopping.route,
        Screen.Profile.route
    )

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface
                ) {
                    bottomNavItems.forEach { (screen, icon) ->
                        val selected = currentRoute == screen.route
                        NavigationBarItem(
                            selected = selected,
                            onClick = {
                                if (currentRoute != screen.route) {
                                    navController.navigate(screen.route) {
                                        popUpTo(Screen.Home.route) { saveState = true }
                                        launchSingleTop = true
                                        restoreState = true
                                    }
                                }
                            },
                            icon = { Icon(icon, contentDescription = screen.title) },
                            label = { Text(screen.title) }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigateToRecipe = { id -> navController.navigate(Screen.RecipeDetail.createRoute(id)) },
                    onNavigateToDesserts = { navController.navigate(Screen.Desserts.route) },
                    onNavigateToBeverages = { navController.navigate(Screen.Beverages.route) },
                    onNavigateToTableStyling = { navController.navigate(Screen.TableStyling.route) },
                    onNavigateToExplore = { navController.navigate(Screen.Home.route) }
                )
            }

            composable(Screen.Desserts.route) {
                DessertsScreen(
                    onNavigateBack = { navController.popBackStack() },
                    onNavigateToDetail = { id -> navController.navigate(Screen.RecipeDetail.createRoute(id)) }
                )
            }

            composable(Screen.Beverages.route) {
                BeveragesScreen(
                    onNavigateBack = { navController.popBackStack() },
                    onNavigateToDetail = { id -> navController.navigate(Screen.RecipeDetail.createRoute(id)) }
                )
            }

            composable(Screen.TableStyling.route) {
                TableStylingScreen(
                    onNavigateBack = { navController.popBackStack() },
                    onNavigateToDetail = { id -> navController.navigate(Screen.RecipeDetail.createRoute(id)) }
                )
            }

            composable(Screen.Shopping.route) {
                ShoppingScreen(
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            composable(Screen.Profile.route) {
                ProfileScreen(
                    currentTheme = currentTheme,
                    onThemeSelected = onThemeSelected,
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // Recipe Detail with Deep Linking
            composable(
                route = Screen.RecipeDetail.route,
                arguments = listOf(navArgument("id") { type = NavType.StringType }),
                deepLinks = listOf(
                    navDeepLink { uriPattern = "culinaryverse://recipes/{id}" },
                    navDeepLink { uriPattern = "https://culinaryverse.ai/recipes/{id}" }
                )
            ) { backStackEntry ->
                val recipeId = backStackEntry.arguments?.getString("id") ?: ""
                RecipeDetailScreen(
                    recipeId = recipeId,
                    onNavigateBack = { navController.popBackStack() },
                    onLaunchCookingStudio = { id -> navController.navigate(Screen.CookingStudio.createRoute(id)) }
                )
            }

            // Cooking Studio Hands-Free Step Session
            composable(
                route = Screen.CookingStudio.route,
                arguments = listOf(navArgument("id") { type = NavType.StringType })
            ) { backStackEntry ->
                val recipeId = backStackEntry.arguments?.getString("id") ?: ""
                CookingStudioScreen(
                    recipeId = recipeId,
                    onNavigateBack = { navController.popBackStack() }
                )
            }
        }
    }
}
