# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2026-01-31

### Changed
- **English-Only Prompt Generation**: All prompts sent to Gemini API are now in English
  - System instruction translated to English for better AI comprehension
  - User request formatting now uses English instructions
  - Project type guidance translated to English
  - Notebook LM instructions translated to English
  - Random prompt generation instructions translated to English
  - Output language is still respected - responses are generated in user's selected language

## [1.2.1] - 2026-01-31

### Fixed
- **System Instruction Leak**: Fixed an issue where system instruction text (like "KESİNLİKLE YASAK", "### YANIT FORMATI") was being included in generated prompts
  - Replaced negative "YASAK" statements with positive "ÇIKTI FORMATI" directives
  - Changed transition phrases like "ŞİMDİ" to clearer "[GÖREV]" markers
  - Simplified instruction language to prevent AI confusion
  - Updated both main system instruction and user request formatting

## [1.2.0] - 2026-01-XX

### Added
- **Project Type Selection** - Added 12 project types for better context-aware prompts:
  - Web Application, Mobile Game, Data Analysis, Desktop Application
  - API / Backend, AI / Machine Learning, E-commerce
  - IoT / Embedded, Blockchain / Web3, Content Platform
  - Automation / Script, Other
- **Per-API-Key Rate Limiting** - Rate limits are now tracked separately for each API key
- **Template Default Project Types** - Each template now has a default project type for better results

### Enhanced
- **Improved Gemini Service** - Enhanced prompt generation with project type context
- **UI/UX Improvements** - Better rate limit indicator with visual feedback

## [1.1.0] - 2026-01-XX

### Added
- **Dynamic Prompt Templates** - All 29 templates now support i18n (English & Turkish)
- **Template Selection UI** - Visual indicator for selected templates with clear button
- **Rate Limit Persistence** - API usage counter now persists across page refreshes

### Enhanced
- **Improved Notebook LM** - Deep Research mode now generates research sentences based on user input
- **Random Button Fix** - Randomize button now respects selected templates and user inputs

## [1.0.0] - 2026-01-XX

### Added
- Initial release of PromptNexus
- 🤖 **Gemini 2.5 Flash Integration** - Powerful Google AI model support
- 🎨 **Deep Space Theme** - Modern, dark theme with easy-on-the-eyes interface
- ⚡ **Fast & Responsive** - Instant prompt generation
- 🎯 **Multi-AI Support** - Optimized for ChatGPT, Claude, Midjourney, DALL-E, Gemini, and Notebook LM
- 💻 **IDE Agent Support** - Special support for Cursor, KiloCode, GitHub Copilot, Windsurf, and Antigravity
- 🌡️ **Creativity Temperature** - Adjust complexity level (1-10)
- 🌍 **Multi-Language Output** - Generate prompts in 12 different languages
- 📚 **29 Prompt Templates** - Ready-made templates with i18n support (English & Turkish)
- 🎲 **Random Prompt Generator** - Generate creative, unexpected prompts based on your inputs
- 💾 **Secure API Management** - Your API key is stored locally in your browser
- 📊 **Rate Limit Tracking** - Daily API usage counter with localStorage persistence
- 📋 **Easy Copy** - One-click prompt copying
- 💫 **Framer Motion Animations** - Smooth user experience
- 📥 **Download Prompts** - Save prompts as text files
- 🌐 **Full i18n Support** - Complete Turkish and English localization
