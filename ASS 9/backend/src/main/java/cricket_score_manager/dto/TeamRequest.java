package cricket_score_manager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TeamRequest {

    @NotBlank(message = "Team name is required")
    private String name;

    @NotBlank(message = "Short name is required")
    @Size(max = 10, message = "Short name must not exceed 10 characters")
    private String shortName;

    public TeamRequest() {
    }

    public TeamRequest(String name, String shortName) {
        this.name = name;
        this.shortName = shortName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}
