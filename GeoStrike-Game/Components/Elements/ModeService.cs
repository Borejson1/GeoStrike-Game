using Microsoft.AspNetCore.Components;

public class ModeService
{
    private readonly NavigationManager navigationManager;

    public ModeService(NavigationManager navigationManager)
    {
        this.navigationManager = navigationManager;
    }

    public string CurrentMode =>
        navigationManager.Uri.Contains("MediumMode") ? "medium" :
        navigationManager.Uri.Contains("AdvancedMode") ? "advanced" : "beginner";

    public string RestartButtonId => $"restart-{CurrentMode}";
    public string SkipButtonId => $"skip-{CurrentMode}";
    public string GameModeText => $"{char.ToUpper(CurrentMode[0])}{CurrentMode.Substring(1)} Mode";
    public string JsonDataPath => $"wwwroot/data/{CurrentMode}.json";
    public string ScoreLoading => $"score-{CurrentMode}";
    public string LogoStyle => $"images/logo/logo-{CurrentMode}.png";
}