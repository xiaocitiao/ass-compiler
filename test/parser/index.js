import { expect } from 'chai';
import { parse } from '../../src/parser/index';

const text = `
[Script Info]
; Script generated by Aegisub 3.2.2
; http://www.aegisub.org/
Title: Default Aegisub file
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: None

[Aegisub Project Garbage]

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text
`;

describe('ASS parser', () => {
  it('should parse ASS', () => {
    expect(parse(text)).to.deep.equal({
      info: {
        Title: 'Default Aegisub file',
        ScriptType: 'v4.00+',
        WrapStyle: '0',
        ScaledBorderAndShadow: 'yes',
        'YCbCr Matrix': 'None',
      },
      styles: {
        format: ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'],
        style: [['Default', 'Arial', '20', '&H00FFFFFF', '&H000000FF', '&H00000000', '&H00000000', '0', '0', '0', '0', '100', '100', '0', '0', '1', '2', '2', '2', '10', '10', '10', '1']],
      },
      events: {
        format: ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'],
        comment: [],
        dialogue: [{
          Layer: 0,
          Start: 0,
          End: 5,
          Style: 'Default',
          Name: '',
          MarginL: 0,
          MarginR: 0,
          MarginV: 0,
          Effect: null,
          Text: {
            raw: 'text',
            combined: 'text',
            parsed: [{ tags: [], text: 'text', drawing: [] }],
          },
        }],
      },
    });
  });
});
