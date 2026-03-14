import clsx from "clsx";
import svgPaths from "./svg-5mi6ic2yij";
import imgParticipaSomEnergiaTornaALinici from "@/assets/imgParticipaSomEnergiaTornaALinici.png";
import imgBackground from "@/assets/imgBackground.png";
import imgBackground1 from "@/assets/imgBackground1.png";
import imgImage1 from "@/assets/imgImage1.png";
import imgImage2 from "@/assets/imgImage1.png";
import imgParticipaSomEnergiaAnarALaPaginaDinici from "@/assets/imgParticipaSomEnergiaAnarALaPaginaDinici.png";

function Margin1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[15px] relative shrink-0 w-[28px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[10px] relative size-full">{children}</div>
    </div>
  );
}

function Img1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        {children}
      </svg>
    </div>
  );
}

function Wrapper7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type BackgroundProps = {
  additionalClassNames?: string;
};

function Background({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundProps>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start px-[192px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">{children}</div>
    </div>
  );
}

function Img({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper4 additionalClassNames="size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </Wrapper4>
  );
}

function Container2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[300px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[30px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper4 additionalClassNames="size-[14px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        {children}
      </svg>
    </Wrapper4>
  );
}

function Container1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[480px] relative shrink-0 w-full">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[30px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper4 additionalClassNames="size-[12px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </Wrapper4>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#111827] text-[32px] tracking-[-1px] w-full">
        <p className="leading-[37px]">{children}</p>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[18px] w-full">
        <p className="leading-[24px]">{children}</p>
      </div>
    </div>
  );
}

function Container({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper5>
      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[14px]">{children}</p>
      </div>
    </Wrapper5>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="decoration-solid leading-[20px] underline">{text}</p>
      </div>
    </div>
  );
}
type HeadingText1Props = {
  text: string;
};

function HeadingText1({ text }: HeadingText1Props) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-white w-full">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full z-[1]">
      <Wrapper>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris diam massa, hendrerit nec ullamcorper quis, luctus a urna. Suspendisse commodo nisl ac ante malesuada pulvinar. Fusce sed congue dui. Integer ornare eros ante, eu gravida dui blandit ac."}</Wrapper>
    </div>
  );
}
type HeadingTextProps = {
  text: string;
};

function HeadingText({ text }: HeadingTextProps) {
  return <Wrapper1>{text}</Wrapper1>;
}

function Image1() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[27px]">
      <div className="absolute bg-[#ced5d0] inset-0 rounded-[27px]" />
      <div className="absolute inset-0 overflow-hidden rounded-[27px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground1} />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[14.833px] overflow-clip relative shrink-0 w-[17.833px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8333 14.8333">
        <g id="Group">
          <path d={svgPaths.p23185380} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pf500d00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}
type ContainerTextProps = {
  text: string;
};

function ContainerText({ text }: ContainerTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4c5c] text-[14px] whitespace-nowrap">
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex px-[8px] py-[4px] relative rounded-[4px] shrink-0", additionalClassNames)}>
      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#2b6342] text-[18px] whitespace-nowrap">
        <p className="leading-[23px]">{text}</p>
      </div>
    </div>
  );
}

function ButtonMenuImg() {
  return (
    <Wrapper6>
      <g id="ri-arrow-drop-down-line">
        <path d={svgPaths.p1d250400} fill="var(--fill-0, #2B6342)" id="Vector" />
      </g>
    </Wrapper6>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 1">
      <div className="absolute content-stretch flex flex-col h-[3313px] items-start left-0 min-h-[1200px] top-0 w-[2120px]" data-name="noindex">
        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Header">
          <Background additionalClassNames="bg-[#afb5e8] z-[2]">
            <div className="h-[96px] max-w-[1536px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute content-stretch flex flex-col items-start left-[64px] right-[1250.67px] top-[21.61px]" data-name="Link">
                <div className="h-[62.78px] max-h-[64px] max-w-[221.3300018310547px] relative shrink-0 w-[221.3px]" data-name="Participa Som Energia (Torna a l'inici)">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[101.94%] left-[-0.01%] max-w-none top-[-0.97%] w-[100.01%]" src={imgParticipaSomEnergiaTornaALinici} />
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col items-start left-[657.33px] right-[657.34px] rounded-[4px] top-[33px]" data-name="Search → Form">
                <div className="relative rounded-[20px] shrink-0 w-full" data-name="Input - Cercar">
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col items-start px-[17px] py-[10px] relative w-full">
                      <div className="relative shrink-0 w-full" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[16px] w-full">
                            <p className="leading-[normal]">Search</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[#0c4c27] border-solid inset-0 pointer-events-none rounded-[20px]" />
                </div>
                <div className="absolute bottom-0 content-stretch flex flex-col items-start px-[8px] py-[12px] right-[8px] top-0" data-name="Button - Cercar">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Img">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="ri-search-line">
                        <path d={svgPaths.p3fd40200} fill="var(--fill-0, #0C4C27)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#afb5e8] content-stretch flex items-center justify-between p-[10px] right-[62.41px] rounded-[10px] top-[20px]" data-name="Navigation">
                <div aria-hidden="true" className="absolute border-10 border-[#afb5e8] border-solid inset-0 pointer-events-none rounded-[10px]" />
                <div className="relative shrink-0 w-[66.92px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] relative w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Button menu">
                      <div className="content-stretch flex gap-[2.92px] items-start pt-[0.67px] relative shrink-0 w-full" data-name="Container">
                        <Wrapper6>
                          <g id="ri-global-line">
                            <path d={svgPaths.p2c491b80} fill="var(--fill-0, #0C4C27)" id="Vector" />
                          </g>
                        </Wrapper6>
                        <Wrapper6>
                          <g id="ri-arrow-down-s-line">
                            <path d={svgPaths.p2cef1100} fill="var(--fill-0, #0C4C27)" id="Vector" />
                          </g>
                        </Wrapper6>
                      </div>
                      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
                        <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[14px] text-center whitespace-nowrap">
                          <p className="leading-[18px]">English</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] relative">
                    <div className="content-stretch flex flex-col items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Link - Ajuda">
                      <Wrapper6>
                        <g id="ri-question-line">
                          <path d={svgPaths.pe4fb400} fill="var(--fill-0, #0C4C27)" id="Vector" />
                        </g>
                      </Wrapper6>
                      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[14px] text-center whitespace-nowrap">
                        <p className="leading-[18px]">Help</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[46px] relative shrink-0" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] h-full items-start px-[24px] relative">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex flex-col items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Link - Trobades">
                        <Wrapper6>
                          <g id="ri-road-map-line">
                            <path d={svgPaths.p24b02a00} fill="var(--fill-0, #0C4C27)" id="Vector" />
                          </g>
                        </Wrapper6>
                        <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[14px] text-center whitespace-nowrap">
                          <p className="leading-[18px]">Meetings</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex flex-col items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Link - Activitat">
                        <Wrapper6>
                          <g id="ri-bubble-chart-line">
                            <path d={svgPaths.p334cb700} fill="var(--fill-0, #0C4C27)" id="Vector" />
                          </g>
                        </Wrapper6>
                        <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[14px] text-center whitespace-nowrap">
                          <p className="leading-[18px]">Activities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[24px] relative">
                    <div className="content-stretch flex flex-col items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Link - Entra">
                      <Wrapper6>
                        <g id="ri-user-line">
                          <path d={svgPaths.p10e6ef00} fill="var(--fill-0, #0C4C27)" id="Vector" />
                        </g>
                      </Wrapper6>
                      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[14px] text-center whitespace-nowrap">
                        <p className="leading-[18px]">Sign in</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Background>
          <div className="bg-[#afb5e8] h-[56px] relative shrink-0 w-full z-[1]" data-name="Background">
            <div className="flex flex-col justify-center size-full">
              <div className="content-stretch flex flex-col items-start justify-center px-[192px] relative size-full">
                <div className="flex-[1_0_0] max-w-[1536px] min-h-px min-w-px relative w-full" data-name="Container">
                  <div className="flex flex-row items-center max-w-[inherit] size-full">
                    <div className="content-stretch flex items-center max-w-[inherit] px-[64px] relative size-full">
                      <div className="content-stretch flex items-center justify-between relative shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center relative rounded-[4px] shrink-0" data-name="Container">
                          <div className="content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Link">
                            <Wrapper7>
                              <g id="ri-home-2-line">
                                <path d={svgPaths.p2b2ca400} fill="var(--fill-0, #2B6342)" id="Vector" />
                              </g>
                            </Wrapper7>
                          </div>
                          <ButtonMenuImg />
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#2b6342] text-[18px] whitespace-nowrap">
                            <p className="leading-[23px]">/</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                          <div className="content-stretch flex items-center relative rounded-[4px] shrink-0" data-name="Container">
                            <Text text="Have your say" additionalClassNames="items-start" />
                            <ButtonMenuImg />
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[18px] whitespace-nowrap">
                            <p className="leading-[23px]">/</p>
                          </div>
                        </div>
                        <Text text="Forum" additionalClassNames="items-center" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[3000px] relative shrink-0 w-full" data-name="Background">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#f0f3ec] inset-0" />
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[631.23%] left-[-0.1%] max-w-none top-[-531.07%] w-1/2" src={imgBackground} />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start px-[192px] relative size-full">
            <div className="h-[1218px] max-w-[1536px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute content-stretch flex flex-col items-start left-[1120px] pb-[370px] right-[181.34px] top-[96px]" data-name="Aside - aside">
                <div className="bg-[#f3f4f7] relative rounded-[4px] shrink-0 w-full" data-name="Section">
                  <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
                    <div className="content-stretch flex flex-col gap-[6px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
                        <Img1>
                          <g id="ri-calendar-line">
                            <path d={svgPaths.p24abf600} fill="var(--fill-0, black)" id="Vector" />
                          </g>
                        </Img1>
                        <ContainerText text="Comença - Finalitza" />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                        <div className="flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4c5c] text-[16px] w-full">
                          <p className="leading-[20px]">Indefinit</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start pt-[17px] relative shrink-0 w-full" data-name="HorizontalBorder">
                      <div aria-hidden="true" className="absolute border-[#e1e5ef] border-solid border-t inset-0 pointer-events-none" />
                      <div className="relative shrink-0 w-full" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
                          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4c5c] text-[14px] text-center whitespace-nowrap">
                              <p className="leading-[18px]">Participants</p>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
                            <div className="flex flex-col font-['Outfit:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4c5c] text-[36px] text-center whitespace-nowrap">
                              <p className="leading-[45px]">1</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[181.33px] right-[533.34px] top-[96px]" data-name="Main">
                <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
                    <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#020203] text-[22px] tracking-[-1px] w-full">
                      <p className="leading-[37px]">{`El donatiu d' 1 ct per kWh`}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px pr-[0.001px] relative" data-name="Container">
                      <div className="content-stretch flex items-center mr-[-0.001px] relative shrink-0 w-[684.44px]" data-name="Container">
                        <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Link">
                          <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[24px]" data-name="Container">
                            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="Avatar: Joan Talarn Munter">
                              <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24px]" data-name="default-avatar-0a4d6d53a83dd7692aee.svg fill">
                                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="default-avatar-0a4d6d53a83dd7692aee.svg">
                                  <div className="absolute inset-[-0.25%_0_0.25%_0]" data-name="Group">
                                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                                      <g id="Group">
                                        <path d={svgPaths.p16876e80} fill="var(--fill-0, #908E8E)" id="Vector" />
                                        <path d={svgPaths.p2a302070} fill="var(--fill-0, white)" id="Vector_2" />
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                            <div className="flex flex-col font-['Outfit:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0c4c27] text-[14px] whitespace-nowrap">
                              <p className="decoration-solid leading-[18px] underline">Joan Talarn Munter</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-center min-w-[24px] mr-[-0.001px] pl-[112.891px] relative shrink-0 w-[136.891px]" data-name="Margin">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                          <div className="content-stretch flex items-center relative shrink-0" data-name="Button menu - Controls de recursos">
                            <Wrapper7>
                              <g id="ri-more-2-fill">
                                <path d={svgPaths.p26129c00} fill="var(--fill-0, #0C4C27)" id="Vector" />
                              </g>
                            </Wrapper7>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[23px] items-start relative shrink-0 text-[#3e4c5c] text-[18px] w-full whitespace-nowrap" data-name="Section">
                  <div className="flex flex-col justify-center leading-[0] relative shrink-0">
                    <p className="leading-[23px]">{`Hola, avui he descobert el "Participa" i m'apunto a aportar idees, us explico:`}</p>
                  </div>
                  <div className="flex flex-col justify-center leading-[23px] relative shrink-0">
                    <p className="mb-0">{`Fins la primavera del 2024 vaig estar fent el donatiu de'1ct/kWh en factura.`}</p>
                    <p className="mb-0">Llavors em vaig comprar un cotxe electric que estic carregant amb la tarifa indexada de SE. Com que</p>
                    <p className="mb-0">amb el cotxe electric consumeixo bastans més kWh que abans, per evitar incrementar la factura, em</p>
                    <p className="mb-0">vaig donar de baixa del donatiu. Sé que el donatiu serveix per finançar les Escoles i els GL de SE i em sap</p>
                    <p className="mb-0">greu no colaborar-hi.</p>
                    <p className="mb-0">{`Pregunto: seria possible establir un donatiu "fixe" o " de cotxe electric" que no anés lligat directament`}</p>
                    <p className="mb-0">als kWh consumits?</p>
                    <p className="mb-0">Per exemple: lligat al consum mitjà del soci domèstic de SE ( deuen ser uns 2500 kWh/any?), o bé una</p>
                    <p>xifra excacta, no lligada al consum de kWh?</p>
                  </div>
                  <div className="flex flex-col justify-center leading-[0] relative shrink-0">
                    <p className="leading-[23px]">Salutacions i endavant!</p>
                  </div>
                </div>
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Section → List">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Link">
                      <Img1>
                        <g id="ri-price-tag-3-line">
                          <path d={svgPaths.p369f0f00} fill="var(--fill-0, #6B7280)" fillOpacity="0.8" id="Vector" />
                        </g>
                      </Img1>
                      <ContainerText text="🤝 Comercialització" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Section">
                  <div className="content-stretch flex h-[28px] items-start relative shrink-0" data-name="Container">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex gap-[5.99px] items-center justify-center px-[17px] py-[7px] relative rounded-[24px] shrink-0" data-name="Form → Button dialog - M'agrada">
                        <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[24px]" />
                        <Container>{`M'agrada`}</Container>
                        <Wrapper2>
                          <g id="ri-heart-line">
                            <path d={svgPaths.p2818e6c0} fill="var(--fill-0, #0B2E34)" id="Vector" />
                          </g>
                        </Wrapper2>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[6px] items-center justify-center px-[17px] py-[7px] relative rounded-[24px] shrink-0" data-name="Link">
                    <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[24px]" />
                    <Wrapper5>
                      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[12px] text-center whitespace-nowrap">
                        <p className="leading-[14px]">Comentari</p>
                      </div>
                    </Wrapper5>
                    <Wrapper2>
                      <g id="ri-chat-1-line">
                        <path d={svgPaths.p2b6ccf00} fill="var(--fill-0, #0B2E34)" id="Vector" />
                      </g>
                    </Wrapper2>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                    <div className="content-stretch flex gap-[6.01px] items-center justify-center px-[17px] py-[7px] relative rounded-[24px] shrink-0" data-name="Button dialog">
                      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[24px]" />
                      <Container>Compartir</Container>
                      <Wrapper2>
                        <g id="ri-share-line">
                          <path d={svgPaths.p1434b9f0} fill="var(--fill-0, #0B2E34)" id="Vector" />
                        </g>
                      </Wrapper2>
                    </div>
                  </div>
                </div>
                <div className="gap-x-[30px] gap-y-[30px] grid-cols-[repeat(3,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] inline-grid max-w-[1536px] relative shrink-0" data-name="Debate cards">
                  <div className="bg-[#ced5d0] col-1 content-stretch flex flex-col h-[480px] items-start max-h-[592px] max-w-[370px] min-h-[480px] min-w-[300px] relative rounded-[27px] row-1 shrink-0 w-[300px]" data-name="Background">
                    <div aria-hidden="true" className="absolute border-3 border-[#cdff80] border-solid inset-0 pointer-events-none rounded-[27px]" />
                    <Container1>
                      <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative w-full" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#cdff80] content-stretch flex items-center justify-center p-[31px] relative rounded-[200px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[200px]" />
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[96px] text-center tracking-[-1px] whitespace-nowrap">
                              <p className="leading-[37px]">+</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Container1>
                  </div>
                  <div className="col-2 content-stretch flex flex-col h-[480px] items-start max-h-[592px] max-w-[370px] min-h-[480px] min-w-[300px] relative rounded-[27px] row-1 shrink-0 w-[300px]" data-name="Background">
                    <Image1 />
                    <Container1>
                      <div className="content-stretch flex flex-col gap-[306px] h-[298px] items-start relative shrink-0 w-full" data-name="Container">
                        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full z-[2]" data-name="Heading 2:margin">
                            <Wrapper1>{`El donatiu d' 1 ct per kWh`}</Wrapper1>
                          </div>
                          <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full z-[1]" data-name="Margin">
                            <Wrapper>{`Seria possible establir un donatiu "fixe" o " de cotxe electric" que no anés lligat directament als kWh consumits?`}</Wrapper>
                          </div>
                        </div>
                        <div className="content-stretch flex items-end justify-end pt-[12px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#cdff80] content-stretch flex gap-[4px] items-center justify-center px-[31px] py-[13px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[14px] text-center whitespace-nowrap">
                              <p className="leading-[14px]">See debate</p>
                            </div>
                            <Margin1>
                              <div className="content-stretch flex flex-col h-[15px] items-start relative shrink-0 w-[18px]" data-name="Image">
                                <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip pb-[0.167px] pr-[0.167px] relative shrink-0 w-[18px]" data-name="image fill">
                                  <Image />
                                </div>
                              </div>
                            </Margin1>
                          </div>
                        </div>
                      </div>
                    </Container1>
                  </div>
                  <div className="col-3 content-stretch flex flex-col h-[480px] items-start max-h-[592px] max-w-[370px] min-h-[480px] min-w-[300px] relative rounded-[27px] row-1 shrink-0 w-[300px]" data-name="Background">
                    <Image1 />
                    <Container1>
                      <div className="bg-[rgba(107,114,128,0.8)] content-stretch flex items-center justify-center px-[9px] py-[7px] relative rounded-[24px] shrink-0" data-name="Link">
                        <div aria-hidden="true" className="absolute border border-[#0b2e34] border-solid inset-0 pointer-events-none rounded-[24px]" />
                        <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[10px] text-center whitespace-nowrap">
                          <p className="leading-[14px]">Ongoing</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Container">
                        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full z-[2]" data-name="Heading 2:margin">
                            <HeadingText text="Lorem ipsum" />
                          </div>
                          <Margin />
                        </div>
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#c4ecd0] content-stretch flex gap-[4px] items-center justify-center px-[9px] py-[7px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <Wrapper3>
                              <g id="ri-wechat-line">
                                <path d={svgPaths.p1b7fdd00} fill="var(--fill-0, #6B7280)" fillOpacity="0.8" id="Vector" />
                              </g>
                            </Wrapper3>
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4c5c] text-[10px] whitespace-nowrap">
                              <p className="leading-[14px]">1</p>
                            </div>
                          </div>
                          <div className="bg-[#c4ecd0] content-stretch flex gap-[4px] items-center justify-center px-[9px] py-[7px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <Wrapper3>
                              <g id="ri-heart-line">
                                <path d={svgPaths.p8b50d00} fill="var(--fill-0, #6B7280)" fillOpacity="0.8" id="Vector" />
                              </g>
                            </Wrapper3>
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4c5c] text-[10px] whitespace-nowrap">
                              <p className="leading-[14px]">0</p>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-end justify-end pt-[12px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#cdff80] content-stretch flex gap-[4px] items-center justify-center px-[31px] py-[13px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[14px] text-center whitespace-nowrap">
                              <p className="leading-[14px]">See debate</p>
                            </div>
                            <Margin1>
                              <div className="content-stretch flex flex-col h-[15px] items-start relative shrink-0 w-[18px]" data-name="Image">
                                <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip pb-[0.167px] pr-[0.167px] relative shrink-0 w-[18px]" data-name="image fill">
                                  <Image />
                                </div>
                              </div>
                            </Margin1>
                          </div>
                        </div>
                      </div>
                    </Container1>
                  </div>
                  <div className="bg-[#afb5e8] col-1 content-stretch flex flex-col h-[480px] items-start max-h-[592px] max-w-[370px] min-h-[480px] min-w-[300px] relative rounded-[27px] row-2 shrink-0 w-[300px]" data-name="Background">
                    <div className="aspect-[300/180] relative rounded-tl-[27px] rounded-tr-[27px] shrink-0 w-full" data-name="image 1">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[27px] rounded-tr-[27px]">
                        <img alt="" className="absolute h-[131.82%] left-0 max-w-none top-[-0.56%] w-full" src={imgImage1} />
                      </div>
                    </div>
                    <Container2>
                      <div className="content-stretch flex flex-col h-[187px] items-start relative shrink-0 w-full" data-name="Container">
                        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex flex-col h-[177px] items-start pb-[32px] relative shrink-0 w-full z-[1]" data-name="Margin">
                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                              <div className="content-stretch flex flex-col items-start pb-[8px] pt-[12px] relative shrink-0 w-full" data-name="Heading 2:margin">
                                <HeadingText text="Lorem ipsum" />
                              </div>
                              <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[18px] w-full">
                                <p className="leading-[24px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris diam massa, hendrerit nec ullamcorper quis, luctus a urna.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-end justify-end pt-[12px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#cdff80] content-stretch flex gap-[4px] items-center justify-center px-[31px] py-[13px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[14px] text-center whitespace-nowrap">
                              <p className="leading-[14px]">See debate</p>
                            </div>
                            <Margin1>
                              <div className="content-stretch flex flex-col h-[15px] items-start relative shrink-0 w-[18px]" data-name="Image">
                                <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip pb-[0.167px] pr-[0.167px] relative shrink-0 w-[18px]" data-name="image fill">
                                  <Image />
                                </div>
                              </div>
                            </Margin1>
                          </div>
                        </div>
                      </div>
                    </Container2>
                  </div>
                  <div className="bg-[#afb5e8] col-2 content-stretch flex flex-col h-[480px] items-start max-h-[592px] max-w-[370px] min-h-[480px] min-w-[300px] relative rounded-[27px] row-2 shrink-0 w-[300px]" data-name="Background">
                    <div className="relative shrink-0 size-[137px]" data-name="image 2">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
                    </div>
                    <Container2>
                      <div className="content-stretch flex flex-col h-[187px] items-start relative shrink-0 w-full" data-name="Container">
                        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex flex-col h-[177px] items-start pb-[32px] relative shrink-0 w-full z-[1]" data-name="Margin">
                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                              <div className="content-stretch flex flex-col items-start pb-[8px] pt-[12px] relative shrink-0 w-full" data-name="Heading 2:margin">
                                <HeadingText text="Lorem ipsum" />
                              </div>
                              <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[18px] w-full">
                                <p className="leading-[24px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris diam massa, hendrerit nec ullamcorper quis, luctus a urna.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-end justify-end pt-[12px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#cdff80] content-stretch flex gap-[4px] items-center justify-center px-[31px] py-[13px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[14px] text-center whitespace-nowrap">
                              <p className="leading-[14px]">See debate</p>
                            </div>
                            <Margin1>
                              <div className="content-stretch flex flex-col h-[15px] items-start relative shrink-0 w-[18px]" data-name="Image">
                                <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip pb-[0.167px] pr-[0.167px] relative shrink-0 w-[18px]" data-name="image fill">
                                  <Image />
                                </div>
                              </div>
                            </Margin1>
                          </div>
                        </div>
                      </div>
                    </Container2>
                  </div>
                  <div className="bg-[#afb5e8] col-3 content-stretch flex flex-col h-[480px] items-start max-h-[592px] max-w-[370px] min-h-[480px] min-w-[300px] relative rounded-[27px] row-2 shrink-0 w-[300px]" data-name="Background">
                    <Container1>
                      <div className="content-stretch flex flex-col h-[298px] items-start justify-between relative shrink-0 w-full" data-name="Container">
                        <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full z-[2]" data-name="Heading 2:margin">
                            <HeadingText text="Lorem ipsum" />
                          </div>
                          <Margin />
                        </div>
                        <div className="content-stretch flex items-end justify-end pt-[12px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-[#cdff80] content-stretch flex gap-[4px] items-center justify-center px-[31px] py-[13px] relative rounded-[24px] shrink-0" data-name="Link">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0b2e34] text-[14px] text-center whitespace-nowrap">
                              <p className="leading-[14px]">See debate</p>
                            </div>
                            <Margin1>
                              <div className="content-stretch flex flex-col h-[15px] items-start relative shrink-0 w-[18px]" data-name="Image">
                                <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip pb-[0.167px] pr-[0.167px] relative shrink-0 w-[18px]" data-name="image fill">
                                  <Image />
                                </div>
                              </div>
                            </Margin1>
                          </div>
                        </div>
                      </div>
                    </Container1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-end relative shrink-0 w-full" data-name="Footer">
          <Background additionalClassNames="bg-[#0b2e34]">
            <div className="h-[257px] max-w-[1536px] min-h-[257px] relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex gap-[32px] items-start max-w-[inherit] min-h-[inherit] px-[64px] py-[40px] relative size-full">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[458.67px]" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
                    <div className="h-[64px] max-h-[64px] max-w-[458.6700134277344px] relative shrink-0 w-[105.58px]" data-name="Participa Som Energia (Anar a la pàgina d'inici)">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgParticipaSomEnergiaAnarALaPaginaDinici} />
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[17.5px] items-start max-w-[596.9569702148438px] relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full">
                        <p className="leading-[18px]">Benvinguda a la plataforma participativa Participa Som Energia.</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                      <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[18px] relative shrink-0 text-[14px] text-white w-full">
                        <p className="mb-0">Construïm una societat més oberta, transparent i col·laborativa.</p>
                        <p>Uneix-te, participa i decideix.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] items-start justify-center relative self-stretch shrink-0 w-[917.33px]" data-name="Container">
                  <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[217.33px]" data-name="Navigation - Decidim">
                    <HeadingText1 text="Decidim" />
                    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Menu item">
                      <Text1 text="Have your say!" />
                      <Text1 text="Participa i decideix" />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[217.33px]" data-name="Navigation - El meu compte">
                    <HeadingText1 text="El meu compte" />
                    <Text1 text="Sign in" />
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[217.33px]" data-name="Navigation - Recursos">
                    <HeadingText1 text="Recursos" />
                    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
                      <Text1 text="Activities" />
                      <Text1 text="Meetings" />
                      <Text1 text="Dades obertes" />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[217.34px]" data-name="Navigation - Ajuda">
                    <HeadingText1 text="Help" />
                    <Text1 text="Guia ràpida" />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[1536px] relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-row items-center max-w-[inherit] size-full">
                <div className="content-center flex flex-wrap gap-[0px_24px] items-center max-w-[inherit] px-[64px] py-[24px] relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Navigation - Legal">
                    <div className="content-stretch flex gap-[40px] h-[18px] items-start relative shrink-0" data-name="List">
                      <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
                        <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white whitespace-nowrap">
                          <p className="decoration-solid leading-[18px] underline">Avís legal i condicions d’ús</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
                        <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[0px] text-white whitespace-nowrap">
                          <p className="decoration-solid leading-[18px] text-[14px] underline">Configuració de les galetes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Navigation - Xarxes socials:margin" />
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93px]" data-name="Container">
                    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Button menu">
                      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex items-center justify-between px-[9px] py-[7px] relative w-full">
                          <Img>
                            <g id="ri-global-line">
                              <path d={svgPaths.p1e7b8300} fill="var(--fill-0, white)" id="Vector" />
                            </g>
                          </Img>
                          <div className="relative shrink-0" data-name="Container">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
                              <div className="flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
                                <p className="leading-[16px]">English</p>
                              </div>
                            </div>
                          </div>
                          <Img>
                            <g id="ri-arrow-down-s-line">
                              <path d={svgPaths.p248d0000} fill="var(--fill-0, white)" id="Vector" />
                            </g>
                          </Img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Background>
          <div className="bg-[#020203] relative shrink-0 w-full" data-name="Background">
            <div className="content-stretch flex flex-col items-start px-[192px] py-[20px] relative w-full">
              <div className="max-w-[1536px] relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-row items-center max-w-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[64px] relative w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                      <div className="content-stretch flex gap-[35.33px] items-start pb-px pr-[32px] relative shrink-0" data-name="Container">
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Link">
                          <div className="h-[24.001px] relative shrink-0 w-[99.69px]" data-name="SVG">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.69 24.0006">
                              <g clipPath="url(#clip0_1_591)" id="SVG">
                                <path d={svgPaths.p1a452500} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-2, #1D1D1B)" strokeMiterlimit="10" strokeWidth="0.0948942" />
                                <path d={svgPaths.p20b45e80} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-2, #1D1D1B)" strokeMiterlimit="10" strokeWidth="0.0948942" />
                                <path d={svgPaths.pd9c2830} fill="var(--fill-0, white)" id="Vector_3" stroke="var(--stroke-2, #1D1D1B)" strokeMiterlimit="10" strokeWidth="0.0948942" />
                                <path d={svgPaths.p140f8800} fill="var(--fill-0, white)" id="Vector_4" stroke="var(--stroke-2, #1D1D1B)" strokeMiterlimit="10" strokeWidth="0.0948942" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_591">
                                  <rect fill="white" height="24.0006" width="99.69" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                            <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-white whitespace-nowrap">
                              <p className="leading-[16px]">Made with ❤️</p>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Link">
                          <div className="h-[24px] relative shrink-0 w-[84.359px]" data-name="SVG">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.3594 24">
                              <g clipPath="url(#clip0_1_597)" id="SVG">
                                <path d={svgPaths.p3e170700} fill="var(--fill-0, white)" id="path25" />
                                <path d={svgPaths.p6298a00} fill="var(--fill-0, white)" id="path26" />
                                <path d={svgPaths.p19dd8380} fill="var(--fill-0, white)" id="path27" />
                                <path d={svgPaths.p10ec3300} fill="var(--fill-0, white)" id="path28" />
                                <path d={svgPaths.p12d2be00} fill="var(--fill-0, white)" id="path29" />
                                <path d={svgPaths.p1b566e80} fill="var(--fill-0, white)" id="path30" />
                                <path d={svgPaths.p378c4b00} fill="var(--fill-0, white)" id="path31" />
                                <path d={svgPaths.pde00a00} fill="var(--fill-0, white)" id="path32" />
                                <path d={svgPaths.p11d3ddf0} fill="var(--fill-0, white)" id="path33" />
                                <path d={svgPaths.p12231100} fill="var(--fill-0, white)" id="path34" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_597">
                                  <rect fill="white" height="24" width="84.3594" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-white whitespace-nowrap">
                            <p className="leading-[16px]">Web creada amb programari lliure.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Link">
                      <Wrapper7>
                        <g id="ri-creative-commons-line">
                          <path d={svgPaths.pf1cb080} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                      </Wrapper7>
                      <Wrapper7>
                        <g id="ri-creative-commons-by-line">
                          <path d={svgPaths.p28ebbc00} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                      </Wrapper7>
                      <Wrapper7>
                        <g id="ri-creative-commons-sa-line">
                          <path d={svgPaths.pba00d80} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                      </Wrapper7>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}