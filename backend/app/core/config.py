from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    CVE_API: str = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    ENV: str = "development"

    class Config:
        extra = "allow"

settings = Settings()
